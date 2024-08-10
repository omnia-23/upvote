import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  content: String,
  commentedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

export const Comment = model("Comment", commentSchema);
