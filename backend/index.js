import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "../backend/config/databaseConnection.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

// db connection
databaseConnection();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
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

// app.use(passport.initialize());
// app.use(passport.session());

// auth routes

// user routes

// product routes

// order routes

// sales routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));
