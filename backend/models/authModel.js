import mongoose from "mongoose";

const googleAuthSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const facebookAuthSchema = new mongoose.Schema(
  {
    facebookId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: True,
  }
);

export const GoogleAuth = mongoose.model("googleAuth", googleAuthSchema);
export const FacebookAuth = mongoose.model("facebookAuth", facebookAuthSchema);
