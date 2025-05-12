import { clerkClient } from "@clerk/express";
import Course from "../models/course.models.js";
import { v2 as cloudinary } from "cloudinary";

//update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    console.log("Authorization Header:", req.headers.authorization);
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      success: true,
      message: "You are now elidgable to publish a course!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached!" });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res.json({ success: true, message: "Course Added!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;

    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
