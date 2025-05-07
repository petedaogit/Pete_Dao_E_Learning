import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./db/cloudinary.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { clerkWebhook } from "./controllers/webhook.js";
import router from "./routes/index.js";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();

//initialize Express
const app = express();

//database connection
connectCloudinary();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware);

//port
const port = process.env.PORT || 4000;

//Routes
app.get("/", (req, res) => res.send("Api is running!"));
app.post("/clerk", express.json(), clerkWebhook);
app.use("/api", router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
