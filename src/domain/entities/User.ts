// domain/entities/User.ts
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  nif: string;
  email: string;
  password: string;
  role: "cliente" | "prestador";
  balance?: number; // Saldo opcional, pois só será usado para "cliente"
  availableSlots?: number; // Slots disponíveis, opcional para "prestador"
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  nif: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["cliente", "prestador"], required: true },
  balance: {
    type: Number,
    default: 0,
    validate: {
      validator: function (this: IUser) {
        return (
          this.role !== "cliente" ||
          (this.balance !== undefined && this.balance >= 0)
        );
      },
      message: "Balance is required for clients and must be non-negative",
    },
  },
  availableSlots: {
    type: Number,
    default: 0,
    validate: {
      validator: function (this: IUser) {
        return (
          this.role !== "prestador" ||
          (this.availableSlots !== undefined && this.availableSlots >= 0)
        );
      },
      message:
        "Available slots are required for providers and must be non-negative",
    },
  },
});

export default mongoose.model<IUser>("User", UserSchema);
export { IUser };
