import express from "express";
const router = express.Router();
import {
  salesCount,
  getTotalSales,
  getTopProducts,
  statusDistribution,
  locationDistribution,
  getTopCategories,
} from "../controllers/salesController.js";

router.get("/sales-count", salesCount);
router.get("/sales-by-day", getTotalSales);
router.get("/top-products", getTopProducts);
router.get("/status-distribution", statusDistribution);
router.get("/location-distribution", locationDistribution);
router.get("/sales-by-category", getTopCategories);

export default router;
