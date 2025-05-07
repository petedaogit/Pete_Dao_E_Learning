import express from "express";
import educatorRouter from "./educators.routes.js";

const router = express.Router();

router.use("/educator", educatorRouter);

export default router;
