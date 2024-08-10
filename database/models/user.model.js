import mongoose from "mongoose";
import { roles } from "../../src/types/role.enum.js";
import { gender } from "../../src/types/gender.enum.js";

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: {
      type: String,
      unique: [true, "email should be unique"],
      required: ["true", "email is required"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    gender: {
      type: String,
      enum: Object.values(gender),
    },
    role: {
      type: String,
      enum: Object.values(roles),
    },
    verify: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
