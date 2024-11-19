// server/index.js
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import User from './models/user.model.js';
import Booking from './models/booking.model.js';
import connectDB from './db/db.js';


const app = express();

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed!', err);
  });


// Endpoint to create a new user
app.post('/api/credentials', async (req, res) => {
  try {
    const { name, address, phone, aadhar, room, shift, seat } = req.body;
    
    // Create a new user
    const user = await User.create({ name, address, phone, aadhar, room, shift, seat });

    // Update the booking data
    let booking = await Booking.findOne({ room, shift });
    if (!booking) {
      booking = new Booking({ room, shift, bookedSeats: [] });
    }
    booking.bookedSeats.push(seat);
    await booking.save();

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ status: 'error', error: 'Error creating user' });
  }
});

// Endpoint to save booking data
app.post('/api/bookings', async (req, res) => {
  try {
    const { room, shift, seat } = req.body;

    // Find the existing booking for the specified room and shift
    let booking = await Booking.findOne({ room, shift });

    if (booking) {
      // Check if the seat is already booked
      if (booking.bookedSeats.includes(seat)) {
        return res.status(400).json({ status: 'error', error: 'Seat already booked' });
      }

      // Add the new seat to the bookedSeats array
      booking.bookedSeats.push(seat);
    } else {
      // Create a new booking if none exists for the specified room and shift
      booking = new Booking({
        room,
        shift,
        bookedSeats: [seat]
      });
    }

    await booking.save();
    res.json({ status: 'ok', booking });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ status: 'error', error: 'Error creating booking' });
  }
});

// Used by frontend to retrieve data from server
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ status: 'error', error: 'Error fetching bookings' });
  }
});

app.post('/api/reset', async (req, res) => {
  try {
    // Delete all users
    await User.deleteMany({});
    // Delete all bookings
    await Booking.deleteMany({});
    res.json({ status: 'ok', message: 'Database reset successful' });
  } catch (err) {
    console.error('Error resetting database:', err);
    res.status(500).json({ status: 'error', error: 'Error resetting database' });
  }
});
