import mongoose from "mongoose";
import commentModel from "./comment";

const productSchema = mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  shortDes: {
    type: String,
    required: true,
  },
  longDes: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
