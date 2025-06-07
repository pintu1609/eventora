import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  password: string;
  userType: "admin" | "user" ;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);
