import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import userRouter from "./routers/user.router.js";

const corsOption = {
  origin: "https://devdevausermanagement.vercel.app/",
  credentials: true,
};

async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }

  const app = express();
  const port = 4000;

  // app.use(cors(corsOption));
  app.use(cors());

  app.use(express.json());
  app.use("/users", userRouter);

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
