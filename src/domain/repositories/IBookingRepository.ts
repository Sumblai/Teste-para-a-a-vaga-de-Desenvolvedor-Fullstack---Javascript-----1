import { IBooking } from "../entities/Booking";

interface IBookingRepository {
  create(booking: IBooking): Promise<IBooking>;
  findAllByClientId(clientId: string): Promise<IBooking[]>;
  findAllByServiceId(serviceId: string): Promise<IBooking[]>;
}

export { IBookingRepository };
