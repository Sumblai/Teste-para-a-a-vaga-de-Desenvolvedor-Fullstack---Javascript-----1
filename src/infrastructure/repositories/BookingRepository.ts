// infrastructure/repositories/BookingRepository.ts
import Booking, { IBooking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/repositories/IBookingRepository";

class BookingRepository implements IBookingRepository {
  async create(booking: IBooking): Promise<IBooking> {
    return await Booking.create(booking);
  }

  async findAllByClientId(clientId: string): Promise<IBooking[]> {
    return await Booking.find({ clientId });
  }

  async findAllByServiceId(serviceId: string): Promise<IBooking[]> {
    return await Booking.find({ serviceId });
  }
}

export { BookingRepository };
