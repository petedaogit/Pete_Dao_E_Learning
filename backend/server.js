import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./db/cloudinary.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { clerkWebhook } from "./controllers/webhook.js";
dotenv.config();

//initialize Express
const app = express();

//database connection
connectCloudinary();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//port
const port = process.env.PORT || 4000;

//Routes
app.get("/", (req, res) => res.send("Api is running!"));
app.post("/clerk", express.json(), clerkWebhook);

app.listen(port, () => console.log(`Server is running on port ${port}`));
