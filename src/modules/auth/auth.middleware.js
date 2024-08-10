import { User } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/errorHandler.js";

export const uniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) next(new AppError("email already exist ", 400));
  next();
};
