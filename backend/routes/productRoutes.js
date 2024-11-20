import express from "express";
import {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get", getProducts);
router.put("/update", updateProduct);
router.post("/add", addProduct);
router.delete("/delete", deleteProduct);
router.get("/:productId", getProduct);
export default router;
