import mongoose from "mongoose";
import userModel from "./user";
import departmentModel from "./department";

const tiketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: mongoose.Types.ObjectId,
      ref: "Tiket",
    },
    answerFor: {
      type: mongoose.Types.ObjectId,
      ref: "Tiket",
    },
  },
  {
    timestamps: true,
  }
);

const tiketModel =
  mongoose.models.Tiket || mongoose.model("Tiket", tiketSchema);

export default tiketModel;
