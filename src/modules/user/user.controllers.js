import { User } from "../../../database/models/user.model.js";
import { AppError, catchError } from "../../utils/errorHandler.js";

export const getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ users });
});

export const createUser = catchError(async (req, res, next) => {
  const users = await User.create(req.body);
  res.status(201).json({ users });
});
