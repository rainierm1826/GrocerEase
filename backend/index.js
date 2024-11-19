import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "../backend/config/databaseConnection.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import auth from "../backend/routes/authRoutes.js";
import "./config/googleStrategy.js";
import "./config/facebookStrategy.js";
import passport from "passport";
import User from "./models/userModel.js";

dotenv.config();

const app = express();

// db connection
databaseConnection();

// middlewares
app.use(express.json());
// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: false,
      maxAge: 14 * 24 * 60 * 60,
      saveUninitialized: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// serialize passport
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

// deserialize passport
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// auth routes
app.use("/auth", auth);

// user routes

// product routes

// order routes

// sales routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));
