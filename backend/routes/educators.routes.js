import express from "express";
import { updateRoleToEducator } from "../controllers/educators.controller.js";

const educatorRouter = express.Router();

//adding educator role
educatorRouter.get("/update-role", updateRoleToEducator);

export default educatorRouter;
