import { IBookingHistory } from "../entities/BookingHistory";

interface IBookingHistoryRepository {
  create(history: IBookingHistory): Promise<IBookingHistory>;
  findAllByClientId(clientId: string): Promise<IBookingHistory[]>;
  findAllByBookingId(bookingId: string): Promise<IBookingHistory[]>;
  findById(historyId: string): Promise<IBookingHistory | null>;
}

export { IBookingHistoryRepository };
