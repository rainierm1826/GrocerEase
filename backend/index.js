import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "../backend/config/databaseConnection.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import auth from "../backend/routes/authRoutes.js";
import user from "../backend/routes/userRoutes.js";
import product from "../backend/routes/productRoutes.js";
import cart from "../backend/routes/cartRoutes.js";
import order from "../backend/routes/orderRoutes.js";
import sales from "../backend/routes/salesRoutes.js"
import "./config/googleStrategy.js";
import "./config/facebookStrategy.js";
import "./config/localStrategy.js";
import passport from "passport";
import User from "./models/userModel.js";

dotenv.config();

const app = express();

// db connection
databaseConnection();

// middlewares
app.use(express.json({ limit: "10mb" }));
// cors
app.use(
  cors({
    origin: [
      "https://grocerease-1ik4.onrender.com",
      "http://localhost:5173", // Keep this for local development
      "http://localhost:5000"  // Add any other local development origins
    ],
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
app.use("/user", user);

// product routes
app.use("/product", product);

// cart
app.use("/cart", cart);

// order routes
app.use("/order", order);

// sales routes
app.use("/sales", sales)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));
