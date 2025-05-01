import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    //check for environment variables
    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_SECRET_KEY
    ) {
      throw new Error("❌ Missing Cloudinary environment variables");
    }

    //cloudinary config
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    const response = await cloudinary.api.ping();
    if (response.status === "ok") {
      console.log("✅ Cloudinary connected successfully");
    } else {
      throw new Error("❌ Cloudinary ping failed");
    }
  } catch (error) {
    console.error("❌ failed to connect to Cloudinary:", error.message);
    process.exit(1); //Exit process with failure
  }
};
export default connectCloudinary;
