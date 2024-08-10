import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandler.js";

export const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];

  if (!token) throw new AppError("authenticated", 401);
  const decoded = jwt.verify(token, process.env.KEY);
  req.user = decoded;
  next();
};

export const authorized = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new AppError("forbidden", 403);
    next();
  };
};
