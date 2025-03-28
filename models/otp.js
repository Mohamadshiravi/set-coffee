import mongoose from "mongoose";

const schema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
});

const otpModel = mongoose.models.Otp || mongoose.model("Otp", schema);
export default otpModel;
