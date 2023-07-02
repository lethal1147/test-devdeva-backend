import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getOneUser,
  updateUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getOneUser);
userRouter.post("/", upload.single("image"), createUser);
userRouter.put("/:id", upload.single("image"), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
