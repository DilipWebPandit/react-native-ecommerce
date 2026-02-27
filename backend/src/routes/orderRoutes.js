import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkout,
  getMyOrders,
  payOrder,
  placeOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/checkout", protect, checkout);
router.post("/", protect, placeOrder);
router.put("/:id/pay", protect, payOrder);
router.get("/myOrders", protect, getMyOrders);

export default router;
