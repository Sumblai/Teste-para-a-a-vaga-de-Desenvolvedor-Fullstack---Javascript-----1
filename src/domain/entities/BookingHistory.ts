import mongoose, { Schema, Document } from "mongoose";

interface IBookingHistory extends Document {
  bookingId: mongoose.Types.ObjectId;
  previousData: any;
  newData: any;
  createdAt: Date;
}

const BookingHistorySchema: Schema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    previousData: { type: Schema.Types.Mixed, required: true },
    newData: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IBookingHistory>(
  "BookingHistory",
  BookingHistorySchema
);
export { IBookingHistory };
