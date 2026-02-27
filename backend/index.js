import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
// import crypto from "crypto";

// const secrete = crypto.randomBytes(64).toString("hex");

// console.log(secrete);

dotenv.config();

const port = process.env.PORT || 5000;

// connected to db
connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
