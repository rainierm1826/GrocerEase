import express from "express";
import {
  addToCart,
  deleteCart,
  viewCart,
  editCart,
  checkoutCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/get", viewCart);
router.post("/checkoutCart", checkoutCart);
router.delete("/deleteCart", deleteCart);
router.post("/updateCart", editCart);

export default router;
