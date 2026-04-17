import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HotelUser from "../models/hotel.user.model.js";

export const registerHotelOwner = async (data) => {
  const exists = await HotelUser.findOne({ email: data.email });
  if (exists) throw new Error("Email already registered!");

  const hashedPass = await bcrypt.hash(data.password, 10);

  const user = await HotelUser.create({
    ownerName: data.ownerName,
    email: data.email,
    phone: data.phone,
    password: hashedPass,
  });

  return user;
};

export const loginHotelOwner = async (email, password) => {
  const user = await HotelUser.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};
