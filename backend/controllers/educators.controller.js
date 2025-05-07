import { clerkClient } from "@clerk/express";

//update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      success: true,
      message: "You are now elidgable to publish a course!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
