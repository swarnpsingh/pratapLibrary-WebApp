import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadharNo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
