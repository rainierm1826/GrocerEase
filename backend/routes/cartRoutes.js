import express from "express";
import { addToCart, viewCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/get", viewCart);

export default router;
