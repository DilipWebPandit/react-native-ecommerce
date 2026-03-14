import User from "../models/userModel.js";

// export const addAddress = async (req, res) => {
//   try {
//     const user = User.findById(req.user._id);

//     if (!user.addresses) {
//       user.addresses = [];
//     }

//     user.addresses.push(req.body);

//     await user.save();

//     res.status(201).json(user.addresses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.addresses) {
      user.addresses = [];
    }

    user.addresses.push(req.body);

    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, req.body);

    await user.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
