import {GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import dotenv from dotenv
import {GoogleAuth} from "../models/authModel"
import User from "../models/userModel"
dotenv.config()

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
},  
    async (accessToken, refreshToken, profile, done) => {
        try {
            let googleAuth = await GoogleAuth.findOne({googleId: profile.id})
            if (!googleAuth) {
                const newUser = new User({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    middleName: profile.name.middleName,
                })
                await newUser.save()
                googleAuth = new GoogleAuth({googleId: profile.id})
                await googleAuth.save()
                
            }

            return done(null, googleAuth)
        } catch (error) {
            return done(error, null)
        }
    }
))