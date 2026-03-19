import express from "express";

import {
  changePassword,
  updateProfileInfo,
  deleteProfile,
} from "../controllers/updateProfileController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.put("/changePassword", protect, changePassword);
router.put("/basicInfo", upload.single("profileImage"), protect, updateProfileInfo);
router.delete("/deleteUser", protect, deleteProfile);

export default router;
