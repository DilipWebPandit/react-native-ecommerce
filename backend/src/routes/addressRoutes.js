import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
} from "../controllers/userAddressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.put("/:id", protect, updateAddress);

export default router;
