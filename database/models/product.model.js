import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: Number,
    description: String,
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numOfLikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);
