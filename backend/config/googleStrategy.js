import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

// google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            middleName: profile.name.middleName || "",
          });
          await newUser.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
