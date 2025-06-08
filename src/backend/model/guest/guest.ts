import mongoose, { Document, Model, Schema } from "mongoose";

export interface Guest extends Document {
  name: string;
  email: string;
  phone: string;
  status: string;
  qrToken: string;
  hasEntered: boolean;
  image: string;
}

const guestSchema: Schema<Guest> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, default: "pending" },
  qrToken: { type: String },
  hasEntered: { type: Boolean, default: false },
  image: { type: String, required: true },
});

export const Guest: Model<Guest> =
  mongoose.models.Guest || mongoose.model("Guest", guestSchema);
