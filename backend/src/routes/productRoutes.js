import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProdcut,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, upload.array("images", 5), createProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.array("images", 5), updateProduct)
  .delete(protect, admin, deleteProdcut);

export default router;
