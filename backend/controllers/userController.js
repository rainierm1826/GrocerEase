import User from "../models/userModel.js";

const updateUser = async (req, res) => {
  try {
    const { _id, newProfile } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: newProfile },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "An error occurred during update",
      error: error.message,
    });
  }
};

export default updateUser;
