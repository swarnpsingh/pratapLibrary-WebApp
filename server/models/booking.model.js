// server/models/booking.model.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  room: { type: Number, required: true },
  shift: { type: String, required: true },
  bookedSeats: { type: [Number], default: [] },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
