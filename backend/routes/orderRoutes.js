import express from "express";
const router = express.Router();
import { checkout, getOrder } from "../controllers/orderController.js";

router.post("/checkout", checkout);
router.post("/vieworder", getOrder);

export default router;
