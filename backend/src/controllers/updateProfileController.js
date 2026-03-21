import userModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

// change password
// export const changePassword = async (req, res) => {
//   try {
//     const isUser = await userModel.findById(req.user._id);

//     if (!isUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     Object.assign(isUser, req.body);

//     await isUser.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import bcrypt from "bcryptjs";

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(newPassword, salt);

    user.password = newPassword; // plain

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// change profile basic infor
// export const updateProfileInfo = async (req, res) => {
//   try {
//     const isUser = await userModel.findById(req.user._id);

//     if (!isUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("This is basic infor", req.body);
//     console.log("This is", isUser);

//     const address = user.addresses.id(req.params.addressId);

//     if (!address) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     Object.assign(isUser.addresses, req.body);

//     const updatedUserValue = await isUser.save();

//     res.status(200).json(updatedUserValue);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateProfileInfo = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const defaultAddress = user.addresses.find(
//       (addr) => addr.isDefault === false,
//     );

//     console.log("This is defaultAddress", defaultAddress);

//     if (!defaultAddress) {
//       return res.status(404).json({ message: "Default address not found" });
//     }

//     Object.assign(defaultAddress, req.body);

//     await user.save();

//     res.status(200).json({
//       message: "Address updated successfully",
//       addresses: user.addresses,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateProfileInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    console.log("This is req.file", req.file);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    // image from multer
    // if (req.file) {
    //   user.profileImage = req.file.url;
    // }

    if (req.file) {
      // 1. Delete old image (if exists)
      if (user.profileImage?.public_id) {
        await cloudinary.v2.uploader.destroy(user.profileImage.public_id);
      }

      // 2. Save new image
      user.profileImage = {
        public_id: req.file.public_id,
        url: req.file.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { addressId } = req.params;

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, req.body);

    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete profile
// export const deleteProfile = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.isDeleted = true;

//     await user.save();

//     res.status(200).json({
//       message: "User profile deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const deleteProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isDeleted = true;
    user.deletedAt = new Date(); // 👈 optional but useful

    await user.save();

    res.status(200).json({
      message: "User profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
