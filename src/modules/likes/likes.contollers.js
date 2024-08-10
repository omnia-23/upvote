import { Like } from "../../../database/models/likes.model.js";
import { catchError } from "../../utils/errorHandler.js";

export const createLike = catchError(async (req, res, next) => {
  const likedBy = req.user.id;
  const { likedOn, likedType } = req.body;
  const like = await Like.create({
    likedBy,
    likedOn,
    likedType,
  });
  res.status(201).json({ like });
});

export const getLike = catchError(async (req, res, next) => {
  const like = await Like.find().populate("likedOn");
  res.status(201).json({ like });
});
