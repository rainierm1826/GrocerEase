import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  "admin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email });

        if (!admin)
          return done(null, false, { status: false, message: "Invalid email" });

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch)
          return done(null, false, {
            status: false,
            message: "Invalid password",
          });

        return done(null, admin);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "internal error" });
      }
    }
  )
);
