import User from "../models/user.model.js";
import { cloudinaryUpload } from "../utils/upload.js";

const getUsers = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const totalDocs = await User.countDocuments();
    const users = await User.find()
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    res.status(200).json({ data: users, totalDocs: totalDocs });
  } catch (err) {
    console.log("Error getting item from DB:", err);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("Error getting one item from DB:", err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.id = (await User.countDocuments()) + 1;
    if (req.file) {
      newUser.image = await cloudinaryUpload(req.file);
    }
    await newUser.save();
    console.log("Create user succesfully");
    res.status(201).json({ Message: "Create user succesfully!" });
  } catch (err) {
    console.log("Error creating user:", err);
  }
};

const updateUser = async (req, res) => {
  try {
    const newUpdatedUser = req.body;
    if (req.file) {
      newUpdatedUser.image = await cloudinaryUpload(req.file);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      newUpdatedUser,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(200).json({ message: "User updated!" });
      console.log("User updated!");
    }
  } catch (err) {
    console.log("Error updating user:", err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.log("Fail to delete user:", err);
  }
};

export { getUsers, createUser, updateUser, deleteUser, getOneUser };
