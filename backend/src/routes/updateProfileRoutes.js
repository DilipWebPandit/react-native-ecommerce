import express from "express";

import {
  changePassword,
  updateProfileInfo,
  deleteProfile,
} from "../controllers/updateProfileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/changePassword", protect, changePassword);
router.put("/basicInfo", protect, updateProfileInfo);
router.delete("/deleteUser", protect, deleteProfile);

export default router;
