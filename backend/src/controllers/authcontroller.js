import userSchema from "../models/userModel.js";
import generatToken from "../utility/generatToken.js";

// export const registerUser = async (req, res) => {
//   const { name, email, password, isAdmin } = req.body;
//   console.log("This is req.body", req.body);

//   try {
//     const isUserExits = await userSchema.findOne({ email, isDeleted: false });

//     if (isUserExits) {
//       return res.status(400).json({ message: "User already exits." });
//     }

//     const user = new userSchema({
//       name,
//       email,
//       password,
//       isAdmin,
//     });

//     await user.save();

//     if (user) {
//       return res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: generatToken(user._id, user.name, user.isAdmin),
//       });
//     } else {
//       res.status(500).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    let user = await userSchema.findOne({ email });

    // User exists and is active
    if (user && !user.isDeleted) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // User exists but was deleted → restore
    if (user && user.isDeleted) {
      user.name = name;
      user.password = password;
      user.isDeleted = false;

      await user.save();

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generatToken(user._id, user.name, user.isAdmin),
      });
    }

    // Completely new user
    user = new userSchema({
      name,
      email,
      password,
      isAdmin,
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatToken(user._id, user.name, user.isAdmin),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Req.body from loginUser", req.body);

  try {
    const user = await userSchema.findOne({ email, isDeleted: false });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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
  if (!req.user || req.user.isDeleted) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(req.user);
};
