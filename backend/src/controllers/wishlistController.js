// controllers/wishlistController.js
import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
// import Wishlist from "../models/wishlistModel.js";

/** Add product to wishlist */
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const alreadyExists = wishlist.items.find(
        (item) => item.product.toString() === productId,
      );

      if (alreadyExists) {
        return res.status(400).json({ message: "Already in wishlist" });
      }

      wishlist.items.push({ product: productId });
      await wishlist.save();
    }

    res.status(200).json({ message: "Added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Get wishlist */
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Remove item from wishlist */
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await wishlist.save();

    res.status(200).json({ message: "Removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Clear wishlist */
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
