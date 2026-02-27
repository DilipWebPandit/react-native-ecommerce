import productModel from "../models/productModel.js";

// create product

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;

    const product = new productModel({
      name,
      description,
      price,
      category,
      countInStock,
      user: req.user._id,
    });
    const createProduct = await product.save();

    res.status(201).json(createProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all products according to paging and limits
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // this will return the product which i have to skip let suppose i am on page 2 and i have 30 products.
    // 2-1 = 1, 1*5 = 5 so i have to show from 6 to 30 products
    const skip = (page - 1) * limit;

    const products = await productModel.find().limit(limit).skip(skip);

    const total = await productModel.countDocuments();

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get products by id
export const getProductById = async (req, res) => {
  try {
    // console.log("product id", req.params.id);
    const product = await productModel.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update products
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;
    const product = await productModel.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

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
export const deleteProdcut = async (req, res) => {
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
