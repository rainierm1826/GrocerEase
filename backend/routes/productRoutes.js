import express from "express";
import {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get", getProducts);
router.put("/update", updateProduct);
router.post("/add", addProduct);
router.delete("/delete", deleteProduct);

export default router;
