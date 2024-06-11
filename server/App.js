import express from "express";
import { config } from "dotenv";
import { User } from "./models/user.model.js";
import { connectDB } from "./db/databaseConnect.js";

config({
  path: "./.env",
});

const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Users!");
});

app.post("/createuser", async (req, res) => {
  const { name, phoneNo, address, aadharNo } = req.body;
  let user = await User.findOne({ aadharNo });
  if (user) {
    return res.json({ success: false, message: "User Already Exists!" });
  }
  user = await User.create({ name, phoneNo, address, aadharNo });
  res.json({ success: true, message: "Registered Successfully!" });
});

app.listen(4000, () => {
  console.log("server is workring on Port 4000.");
});
