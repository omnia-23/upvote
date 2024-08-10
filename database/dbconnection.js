import mongoose from "mongoose";

export const connectionToDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.log(err);
    });
};
