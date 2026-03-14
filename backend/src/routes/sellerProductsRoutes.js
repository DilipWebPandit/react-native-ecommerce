import express from "express";
import {
  getSellerProducts,
  getSellerProductsById,
  updateProduct,
  deleteProduct,
} from "../controllers/sellerProductController.js";

import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/products").get(protect, admin, getSellerProducts);

router
  .route("/products/:id")
  .get(getSellerProductsById)
  .put(protect, admin, upload.array("images", 5), updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
