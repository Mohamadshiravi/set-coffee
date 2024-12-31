import mongoose from "mongoose";

const banuserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const BanUserModel =
  mongoose.models.Banuser || mongoose.model("Banuser", banuserSchema);
export default BanUserModel;
