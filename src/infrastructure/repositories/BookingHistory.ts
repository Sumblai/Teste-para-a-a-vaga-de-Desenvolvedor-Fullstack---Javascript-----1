import { IBookingHistory } from "../../domain/entities/BookingHistory";
import { IBookingHistoryRepository } from "../../domain/repositories/IBookingHistory";
import BookingHistory from "../../domain/entities/BookingHistory";

class BookingHistoryRepository implements IBookingHistoryRepository {
  async create(history: IBookingHistory): Promise<IBookingHistory> {
    const newHistory = new BookingHistory(history);
    await newHistory.save();
    return newHistory;
  }

  async findAllByClientId(clientId: string): Promise<IBookingHistory[]> {
    return BookingHistory.find({ clientId }).exec();
  }

  async findAllByBookingId(bookingId: string): Promise<IBookingHistory[]> {
    return BookingHistory.find({ bookingId }).exec();
  }

  async findById(historyId: string): Promise<IBookingHistory | null> {
    return BookingHistory.findById(historyId).exec();
  }
}

export default BookingHistoryRepository;
