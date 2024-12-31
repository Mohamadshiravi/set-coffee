import mongoose from "mongoose";
import userModel from "./user";
import productModel from "./product";

const wishlistSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const wishlistModel =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export default wishlistModel;
