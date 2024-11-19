import express from "express";
const router = express.Router();
import updateUser from "../controllers/userController.js";

router.put("/update", updateUser);

export default router;
