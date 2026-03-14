import productModel from "../models/productModel.js";

// get all product with seller id

export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;

    if (!sellerId) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const products = await productModel.find({ user: sellerId }).sort({
      createdAt: -1,
    });

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      count: products.length,
      products,
    });

    // if(!sellerData && sellerId.isAdmin
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get product details with spacific id
export const getSellerProductsById = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productModel.find({ _id: id });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update products
export const updateProduct = async (req, res) => {
  try {
    const imageData = (req.files || []).map((file) => ({
      url: file.url,
    }));

    const { name, description, price, category, countInStock } = req.body;
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.category = category ?? product.category;
      product.countInStock = countInStock ?? product.countInStock;

      if (imageData) {
        product.images = imageData;
      }

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete products
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      return res.json({ message: "Product removed" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
