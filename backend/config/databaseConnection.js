import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    if (conn) {
      console.log("database connected");
    } else {
      console.log("error connecting");
    }
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection;
