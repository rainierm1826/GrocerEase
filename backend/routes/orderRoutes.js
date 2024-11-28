import express from "express";
const router = express.Router();
import {
  checkout,
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

router.post("/checkout", checkout);
router.post("/vieworder", getOrder);
router.get("/getOrder", getOrders);
router.post("/updatestatus", updateOrderStatus);

export default router;
