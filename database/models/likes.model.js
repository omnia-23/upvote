import { model, Schema } from "mongoose";
import { LikedType } from "../../src/types/likedType.js";

const likeSchema = new Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likedOn: {
    type: Schema.Types.ObjectId,
    refPath: "likedType",
  },
  likedType: {
    type: String,
    enum: Object.values(LikedType),
  },
});

export const Like = model("Likes", likeSchema);
