import express from "express";
import {
  addCourse,
  updateRoleToEducator,
  getEducatorCourses,
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

educatorRouter.get("/get-courses", protectEducator, getEducatorCourses);

export default educatorRouter;
