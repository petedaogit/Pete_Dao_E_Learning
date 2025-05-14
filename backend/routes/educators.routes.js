import express from "express";
import {
  addCourse,
  updateRoleToEducator,
  getEducatorCourses,
  educatorDashboardData,
  getEnrolledStudentsData,
} from "../controllers/educators.controller.js";
import { protectEducator } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const educatorRouter = express.Router();

//adding educator role
educatorRouter.get("/update-role", updateRoleToEducator);

educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  addCourse
);

educatorRouter.get("/courses", protectEducator, getEducatorCourses);

educatorRouter.get("/dashboard", protectEducator, educatorDashboardData);

educatorRouter.get(
  "/enrolled-students",
  protectEducator,
  getEnrolledStudentsData
);

export default educatorRouter;
