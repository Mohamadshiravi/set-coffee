import mongoose from "mongoose";
import userModel from "./user";
import productModel from "./product";

const orderSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    allPrice: {
      type: Number,
      required: true,
    },
    products: {
      type: [
        {
          _id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          count: { type: Number, min: 1, required: true },
        },
      ],
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
