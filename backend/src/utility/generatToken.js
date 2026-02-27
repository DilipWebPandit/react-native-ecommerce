import jwt from "jsonwebtoken";

const generateToken = (id, name, isAdmin) => {
  return jwt.sign({ id, name, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateToken;
