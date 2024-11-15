import { Request, Response } from "express";
import Booking, { IBooking } from "../../domain/entities/Booking";
import Service from "../../domain/entities/Service";
import User from "../../domain/entities/User";
import BookingHistoryRepository from "../../infrastructure/repositories/BookingHistory";
import BookingHistory from "../../domain/entities/BookingHistory";

export async function createBooking(
  req: Request,
  res: Response
): Promise<void> {
  const { clientId, serviceId, reservationDate } = req.body;

  try {
    const client = await User.findById(clientId);
    const service = await Service.findById(serviceId);

    if (!client || !service) {
      res.status(404).json({ message: "Client or service not found" });
      return;
    }

    if (client.balance === undefined || client.balance < service.price) {
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }
    if (service.availableSlots <= 0) {
      res.status(400).json({ message: "No available slots for this service" });
      return;
    }

    const reservationDateTime = new Date(reservationDate);
    const now = new Date();
    if (reservationDateTime < now) {
      res
        .status(400)
        .json({ message: "Reservation date must be in the future" });
      return;
    }

    const existingBooking = await Booking.findOne({
      clientId,
      serviceId,
      reservationDate: reservationDateTime,
    });

    if (existingBooking) {
      res.status(400).json({
        message: "You already have a booking for this date and service",
      });
      return;
    }
    const booking = new Booking({
      clientId,
      serviceId,
      reservationDate: reservationDateTime,
    });
    await booking.save();
    client.balance -= service.price;
    service.availableSlots -= 1;
    await client.save();
    await service.save();
    res.json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
}

export async function getClientBookingHistory(req: Request, res: Response) {
  const { clientId } = req.params;

  try {
    const bookings = await Booking.find({ clientId })
      .populate({
        path: "serviceId",
        select: "name description price",
      })
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving client booking history", error });
  }
}

export async function getServiceBookingHistory(req: Request, res: Response) {
  const { serviceId } = req.params;

  try {
    const bookings = await Booking.find({ serviceId })
      .populate({
        path: "clientId",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving service booking history", error });
  }
}

export async function updateBookingDate(
  req: Request,
  res: Response
): Promise<void> {
  const { bookingId } = req.params;
  const { newReservationDate } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const client = await User.findById(booking.clientId);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    const newDate = new Date(newReservationDate);
    const now = new Date();
    if (newDate < now) {
      res
        .status(400)
        .json({ message: "New reservation date must be in the future" });
      return;
    }

    const existingBooking = await Booking.findOne({
      clientId: booking.clientId,
      serviceId: booking.serviceId,
      reservationDate: newDate,
    });
    if (existingBooking) {
      res.status(400).json({
        message: "You already have a booking for this date and service",
      });
      return;
    }

    booking.reservationDate = newDate;
    await booking.save();

    res.json({ message: "Booking date updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking date", error });
  }
}

export const cancelBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookingId } = req.params;
  const { clientId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    if (booking.clientId.toString() !== clientId) {
      res
        .status(403)
        .json({ message: "You are not authorized to cancel this booking" });
      return;
    }

    const previousData = {
      clientId: booking.clientId,
      serviceId: booking.serviceId,
      reservationDate: booking.reservationDate,
      createdAt: booking.createdAt,
    };

    const history = new BookingHistory({
      bookingId: booking._id,
      previousData,
      newData: {},
    });

    await history.save();

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking canceled successfully",
      history,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error });
    return;
  }
};

export default cancelBooking;
