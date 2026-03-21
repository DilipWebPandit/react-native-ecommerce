import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/orderRoutes.js";
import address from "./routes/addressRoutes.js";
import sellersProduct from "./routes/sellerProductsRoutes.js";
import updateProfile from "./routes/updateProfileRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

// middlewaress
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", checkoutRoutes);
app.use("/api/address", address);
app.use("/api/seller", sellersProduct);
app.use("/api/profile", updateProfile);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is working");
});

export default app;
