import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8vwbb.mongodb.net/LMS?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    //mongoose event listener
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connection established!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB connection lost. Retrying...");
    });

    //Connect to MongoDB
    await mongoose.connect(DB_CONNECTION);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); //Exit process with failure
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected. Cleaning up...");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("⚠️ MongoDB disconnected through app termination");
  process.exit(0); //handler for closing the mongodb connection when app is terminated
});

export default connectDB;
