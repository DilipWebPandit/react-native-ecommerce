import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

console.log("This is products");

router
  .route("/")
  .post(protect, admin, upload.array("images", 5), createProduct)
  .get(getProducts);

router.route("/:id").get(getProductById);

export default router;
