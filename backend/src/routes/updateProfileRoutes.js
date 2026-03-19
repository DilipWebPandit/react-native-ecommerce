import express from "express";

import {
  changePassword,
  updateProfileInfo,
  deleteProfile,
  updateAddress,
} from "../controllers/updateProfileController.js";

import { protect } from "../middleware/authMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// router.put("/changePassword", protect, changePassword);
// router.put("/basicInfo", protect, upload.single("profileImage"), updateProfileInfo);
// router.delete("/deleteUser", protect, deleteProfile);

router.put("/changePassword", protect, changePassword);

router.put(
  "/basicInfo",
  protect,
  upload.single("profileImage"),
  updateProfileInfo
);

router.put("/address/:addressId", protect, updateAddress);

router.delete("/deleteUser", protect, deleteProfile);

export default router;
