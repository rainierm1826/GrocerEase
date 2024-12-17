import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";
import User from "../models/userModel.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "https://final-project-grocerease.onrender.com/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "displayName", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          facebookId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          facebookId: profile.id,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          middleName: profile.name.middleName || "",
        });

        await newUser.save();

        return done(null, user);
      } catch (error) {
        console.error("Facebook strategy error:", error);
        return done(error, null);
      }
    }
  )
);
