import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: Date.now,
    },
    contactNumber: {
      type: Number,
      default: "",
    },
    location: {
      province: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      barangay: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      blk: {
        type: String,
        default: "",
      },
      lot: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
