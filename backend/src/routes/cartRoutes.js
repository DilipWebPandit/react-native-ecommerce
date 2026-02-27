import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addToCart)
  .get(protect, getCart)
  .delete(protect, clearCart);

router
  .route("/:prodcutId")
  .put(protect, updateCartItem)
  .delete(protect, removeCartItem);

export default router;
