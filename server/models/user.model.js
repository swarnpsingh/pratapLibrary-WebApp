// server/models/user.model.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  aadhar: { type: String, required: true },
  room: { type: Number, required: true },
  shift: { type: String, required: true },
  seat: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);

export default User;
