import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    gender: {
      type: "string",
      required: true,
    },
    birthday: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
    id: {
      type: "number",
      required: true,
    },
  },
  {
    collection: "Users",
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
