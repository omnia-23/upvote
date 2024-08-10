import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../database/models/user.model.js";
import { AppError, catchError } from "../../utils/errorHandler.js";
import { sendMail } from "../../utils/mailSender.js";
import { roles } from "../../types/role.enum.js";

export const signUp = catchError(async (req, res, next) => {
  const { username, password, email, gender } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({
    username,
    password: hash,
    email,
    gender,
    role: roles.USER,
  });

  const token = jwt.sign({ id: user._id }, process.env.KEY);
  await sendMail(user.email, token);
  res.status(201).json({ message: "created Successfully", user });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) next(new AppError("User not found", 404));
  if (!user.verify) next(new AppError("user not verified", 400));
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) next(new AppError("incorrect email or password", 401));
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.KEY,
    { expiresIn: "1d" }
  );
  res.status(200).json({ message: "login successfully", token });
});

export const confirmEmail = catchError(async (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.KEY);
  console.log(decoded);
  if (!decoded) next(new AppError("unauthorized ", 401));
  const user = await User.findById(decoded.id);
  if (!user) next(new AppError("user not found", 404));
  await user.updateOne({ verify: true }, { new: true });
  res.status(200).json({
    message: "verified successfully",
    user,
  });
});
