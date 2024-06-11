import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    morning: {
      type: Boolean,
      required: true,
    },
    afternoon: {
      type: Boolean,
      required: true,
    },
    evening: {
      type: Boolean,
      required: true,
    },
    user:{
        type: user.model.ObjectID,
        ref: User,
    }
  },
  { timestamps: true }
);

export const Shift = mongoose.model("Shift", shiftSchema);
