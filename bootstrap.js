import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/modules/auth/auth.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import likeRouter from "./src/modules/likes/likes.routes.js";
dotenv.config();

export const bootstrap = (app) => {
  app.use(express.json());
  app.use("/auth", authRoute);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/like", likeRouter);

  app.use((error, req, res, next) => {
    const { message, status, stack } = error;
    res
      .status(status || 500)
      .json({ message, ...(process.env.MODE === "development" && { stack }) });
  });
};
