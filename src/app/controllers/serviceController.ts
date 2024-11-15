import { Request, Response } from "express";
import Service, { IService } from "../../domain/entities/Service";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import User from "../../domain/entities/User";
const serviceRepository = new ServiceRepository();

export async function addService(req: Request, res: Response) {
  const { name, description, price, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
    }

    const service = new Service({ name, description, price, providerId });

    const savedService = await serviceRepository.create(service);
    return res.json({
      message: "Service created",
      serviceId: savedService._id,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error creating service", error });
  }
}

export async function updateService(req: Request, res: Response) {
  const { serviceId, name, description, price, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.providerId.toString() !== providerId) {
      return res.status(403).json({
        message: "Access denied. This service does not belong to you.",
      });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    const updatedService = await service.save();
    return res.json({ message: "Service updated", service: updatedService });
  } catch (error) {
    return res.status(400).json({ message: "Error updating service", error });
  }
}

export async function deleteService(req: Request, res: Response) {
  const { serviceId, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      return res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.providerId.toString() !== providerId) {
      return res.status(403).json({
        message: "Access denied. This service does not belong to you.",
      });
    }

    await Service.findByIdAndDelete(serviceId);

    return res.json({ message: "Service deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting service", error });
  }
}

export async function updateBalance(req: Request, res: Response) {
  const { clientId, amount } = req.body;

  try {
    const user = await User.findById(clientId);

    if (!user || user.role !== "cliente") {
      return res
        .status(403)
        .json({ message: "Only clients can update balance" });
    }

    user.balance = (user.balance || 0) + amount;
    await user.save();

    res.json({
      message: "Balance updated successfully",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating balance", error });
  }
}

export async function updateAvailableSlots(req: Request, res: Response) {
  const { serviceId, availableSlots } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.availableSlots = availableSlots;
    await service.save();

    res.json({
      message: "Available slots updated successfully",
      availableSlots: service.availableSlots,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating available slots", error });
  }
}
