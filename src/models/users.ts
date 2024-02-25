import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    selected: false,
    minLength: [6, "Password must be at least 6 characters long"],
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },
});

const User = models.User || model("User", userSchema);
export default User;
