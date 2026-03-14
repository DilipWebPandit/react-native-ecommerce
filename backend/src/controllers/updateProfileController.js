import userModel from "../models/userModel.js";

// change password
export const changePassword = async (req, res) => {
  try {
    const isUser = await userModel.findById(req.user._id);

    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(isUser, req.body);

    await isUser.save();

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

export const updateProfileInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const defaultAddress = user.addresses.find(
      (addr) => addr.isDefault === false,
    );

    console.log("This is defaultAddress", defaultAddress);

    if (!defaultAddress) {
      return res.status(404).json({ message: "Default address not found" });
    }

    Object.assign(defaultAddress, req.body);

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
export const deleteProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isDeleted = true;

    await user.save();

    res.status(200).json({
      message: "User profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
