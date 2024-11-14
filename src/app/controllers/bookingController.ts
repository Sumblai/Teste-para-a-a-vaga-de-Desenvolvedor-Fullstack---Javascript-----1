// app/controllers/bookingController.ts
import { Request, Response } from "express";
import Booking, { IBooking } from "../../domain/entities/Booking";
import Service from "../../domain/entities/Service";
import User from "../../domain/entities/User";
import mongoose from "mongoose";

export async function createBooking(req: Request, res: Response) {
  const { clientId, serviceId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const service = await Service.findById(serviceId).session(session);
    const client = await User.findById(clientId).session(session);
    const provider = await User.findById(service?.providerId).session(session);

    // Verifique se o cliente, serviço e provedor existem
    if (!service || !client || !provider) {
      throw new Error("Invalid data for booking");
    }

    // Verifique se o cliente possui saldo suficiente
    if (client.balance === undefined || client.balance < service.price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Verifique se o serviço possui vagas disponíveis
    if (provider.availableSlots === undefined || provider.availableSlots <= 0) {
      return res
        .status(400)
        .json({ message: "No available slots for this service" });
    }

    // Cria a reserva
    const booking = new Booking({ clientId, serviceId });
    await booking.save({ session });

    // Atualiza o saldo do cliente e reduz o número de vagas do serviço
    client.balance -= service.price;
    provider.availableSlots -= 1;

    await client.save({ session });
    await provider.save({ session });

    await session.commitTransaction();
    res.json({ message: "Booking successful" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Error creating booking", error });
  } finally {
    session.endSession();
  }
}
