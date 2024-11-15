// domain/entities/Booking.ts
import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  clientId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Inclui automaticamente createdAt e updatedAt
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
export { IBooking };
