import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "usersProfilePic",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
  //   params: async (req, file) => {
  //   return {
  //     folder: req.baseUrl.includes("auth") ? "users" : "products",
  //     allowed_formats: ["jpg", "png", "jpeg", "webp"],
  //   };
  // },
});

const usersProfilePic = multer({ storage });

export default usersProfilePic;
