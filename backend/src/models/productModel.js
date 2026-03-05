import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        _id: false,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
