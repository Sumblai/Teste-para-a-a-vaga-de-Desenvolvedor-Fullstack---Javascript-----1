// domain/entities/Service.ts
import mongoose, { Schema, Document } from "mongoose";

interface IService extends Document {
  companyname: string;
  name: string;
  description: string;
  price: number;
  availableSlots: number;
  providerId: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  companyname: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableSlots: { type: Number, required: true, default: 0 },
  providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IService>("Service", ServiceSchema);
export { IService };
