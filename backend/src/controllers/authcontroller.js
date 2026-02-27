import userSchema from "../models/userModel.js";
import generatToken from "../utility/generatToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  console.log("This is req.body", req.body);

  try {
    const isUserExits = await userSchema.findOne({ email });

    if (isUserExits) {
      return res.status(400).json({ message: "User already exits." });
    }

    const user = new userSchema({
      name,
      email,
      password,
      isAdmin,
    });

    await user.save();

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generatToken(user._id, user.name, user.isAdmin),
      });
    } else {
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Req.body from loginUser", req.body);

  try {
    const user = await userSchema.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // isAdmin: user.isAdmin,
        token: generatToken(user._id, user.name, user.isAdmin),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  res.json(req.user);
};
