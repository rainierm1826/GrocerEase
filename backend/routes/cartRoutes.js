import express from "express";
import { addToCart, viewCart } from "../controllers/cartController.js";
import { checkOutFromCart } from "../../frontend/src/api/cart.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/get", viewCart);
router.post("/checkoutCart", checkOutFromCart);

export default router;
