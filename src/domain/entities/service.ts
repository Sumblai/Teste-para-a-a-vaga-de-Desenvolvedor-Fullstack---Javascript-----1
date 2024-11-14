// domain/entities/Service.ts
import mongoose, { Schema, Document } from "mongoose";

interface IService extends Document {
  name: string;
  description: string;
  price: number;
  providerId: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IService>("Service", ServiceSchema);
export { IService };
