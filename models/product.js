import mongoose from "mongoose";
import commentModel from "./comment";

const productSchema = mongoose.Schema({
  images: {
    type: [String],
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  score: {
    type: Number,
    default: 0,
  },
  shortDes: {
    type: String,
  },
  longDes: {
    type: String,
  },
  tags: {
    type: String,
  },
  weight: {
    type: Number,
  },
  suitableFor: {
    type: String,
  },
  smell: {
    type: String,
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  imagesID: {
    type: [String],
  },
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
