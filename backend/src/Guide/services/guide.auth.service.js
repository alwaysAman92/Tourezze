import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import GuideUser from "../models/guide.user.model.js";

export const registerGuide = async (data) => {
  const exists = await GuideUser.findOne({ email: data.email });
  if (exists) throw new Error("Email already registered!");

  const hashed = await bcrypt.hash(data.password, 10);

  const guide = await GuideUser.create({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: hashed,
    languages: data.languages,
    experience: data.experience,
    location: data.location,
  });

  return guide;
};

export const loginGuide = async (email, password) => {
  const guide = await GuideUser.findOne({ email });
  if (!guide) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, guide.password);
  if (!match) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: guide._id, role: guide.role, email: guide.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { guide, token };
};
