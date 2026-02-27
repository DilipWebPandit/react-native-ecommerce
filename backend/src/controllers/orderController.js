// import orderModel from "../models/orderModel";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    for (let item of cart.items) {
      if (item.product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `${item.product.name} is out of stock`,
        });
      }
      totalPrice += item.product.price * item.quantity;
    }

    res.status(200).json({
      item: cart.items,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );

    if (cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let orderItems = [];
    let totalPrice = 0;

    for (let item of cart.items) {
      const product = item.product;

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }

      // Deduct stock
      product.countInStock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Payment Simulation

export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Security Check - Only order owner can pay
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prevent double payment
    if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    // Payment Logic
    if (order.paymentMethod === "Cash") {
      order.paymentStatus = "Pending"; // Paid on delivery
    } else {
      order.paymentStatus = "Paid";
      order.paidAt = Date.now();
    }
    order.orderStatus = "Confirmed";

    await order.save();

    res.status(200).json({ message: "Payment Processed Successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
