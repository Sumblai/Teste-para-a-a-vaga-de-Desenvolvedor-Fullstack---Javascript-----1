// domain/entities/Booking.ts
import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  clientId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  reservationDate: Date;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    providerId : { type: Schema.Types.ObjectId, ref: "Provider", required: true },
    reservationDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
export { IBooking };
