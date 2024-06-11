import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    seatNo:{
        type:Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  { timestamps: true }
);

export const Seat = mongoose.model("Seat", seatSchema);