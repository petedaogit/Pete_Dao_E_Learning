import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./db/cloudinary.js";
import connectDB from "./db/db.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educators.routes.js";
import { clerkMiddleware } from "@clerk/express";
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";

//initialize Express
const app = express();

//database connection
connectCloudinary();
connectDB();

//middlewares
app.use(
  cors({
    origin: [
      "https://lms-frontend-37skw3on3-nam-daos-projects.vercel.app",
      "http://localhost:5173", // For local development
      "https://pete-dao-e-learning.onrender.com",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(clerkMiddleware());

//port
const port = process.env.PORT || 4000;

//Routes
app.get("/", (req, res) => res.send("Api is running!"));
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.listen(port, () => console.log(`Server is running on port ${port}`));
