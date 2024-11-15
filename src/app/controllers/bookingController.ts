import { Request, Response } from "express";
import Booking, { IBooking } from "../../domain/entities/Booking";
import Service from "../../domain/entities/Service";
import User from "../../domain/entities/User";

export async function createBooking(req: Request, res: Response) {
  const { clientId, serviceId } = req.body;

  try {
    const service = await Service.findById(serviceId);
    const client = await User.findById(clientId);

    if (!service || !client) {
      throw new Error("Invalid data for booking");
    }

    if (client.balance === undefined || client.balance < service.price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    if (service.availableSlots <= 0) {
      return res
        .status(400)
        .json({ message: "No available slots for this service" });
    }

    const booking = new Booking({ clientId, serviceId });
    await booking.save();

    client.balance -= service.price;
    service.availableSlots -= 1;

    await client.save();
    await service.save();

    res.json({ message: "Booking successful" });
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
