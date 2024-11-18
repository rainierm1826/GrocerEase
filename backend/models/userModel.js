const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
    },
    sex: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    location: {
      province: String,
      city: String,
      barangay: String,
      street: String,
      blk: String,
      lot: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;
