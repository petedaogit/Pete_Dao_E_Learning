import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./db/cloudinary.js";
import connectDB from "./db/db.js";
import { clerkWebhook } from "./controllers/webhook.js";
import educatorRouter from "./routes/educators.routes.js";
import { clerkMiddleware } from "@clerk/express";

//initialize Express
const app = express();

//database connection
connectCloudinary();
connectDB();

//middlewares
app.use(cors());
app.use(clerkMiddleware());

//port
const port = process.env.PORT || 4000;

//Routes
app.get("/", (req, res) => res.send("Api is running!"));
app.post("/clerk", express.json(), clerkWebhook);
app.use("/api/educator", express.json(), educatorRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
