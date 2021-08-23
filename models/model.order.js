import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    _name: {
      type: String,
      unique: true,
      required: true,
    },
    _number: {
      type: Number,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", OrderSchema);
