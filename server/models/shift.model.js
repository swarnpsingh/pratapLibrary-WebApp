import mongoose, { mongo } from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    morning: {
      type: Boolean,
      default: false,
    },
    afternoon: {
      type: Boolean,
      default: false,
    },
    evening: {
      type: Boolean,
      default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  { timestamps: true }
);

export const Shift = mongoose.model("Shift", shiftSchema);
