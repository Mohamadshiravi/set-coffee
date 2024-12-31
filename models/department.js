import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const departmentModel =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default departmentModel;
