import mongoose from "mongoose";

const discountSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    precent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    use: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const discountModel =
  mongoose.models.Discount || mongoose.model("Discount", discountSchema);

export default discountModel;
