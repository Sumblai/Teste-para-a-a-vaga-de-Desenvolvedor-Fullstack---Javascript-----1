import { Request, Response } from "express";
import Service, { IService } from "../../domain/entities/Service";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepository";
import User from "../../domain/entities/User";
const serviceRepository = new ServiceRepository();

export async function addService(req: Request, res: Response) {
  const { companyname, name, description, price, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
      return;
    }

    const service = new Service({
      companyname,
      name,
      description,
      price,
      providerId,
    });

    const savedService = await serviceRepository.create(service);
    res.json({
      message: "Service created",
      service: savedService,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating service", error });
    return;
  }
}

export async function updateService(
  req: Request,
  res: Response
): Promise<void> {
  const { serviceId, name, description, price, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
      return;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }

    if (service.providerId.toString() !== providerId) {
      res.status(403).json({
        message: "Access denied. This service does not belong to you.",
      });
      return;
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    const updatedService = await service.save();
    res.json({ message: "Service updated", service: updatedService });
  } catch (error) {
    res.status(400).json({ message: "Error updating service", error });
  }
}

export async function deleteService(
  req: Request,
  res: Response
): Promise<void> {
  const { serviceId, providerId } = req.body;

  try {
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
      res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
      return;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }

    if (service.providerId.toString() !== providerId) {
      res.status(403).json({
        message: "Access denied. This service does not belong to you.",
      });
      return;
    }

    await Service.findByIdAndDelete(serviceId);

    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting service", error });
    return;
  }
}

export async function updateBalance(
  req: Request,
  res: Response
): Promise<void> {
  const { clientId, amount } = req.body;

  try {
    const user = await User.findById(clientId);

    if (!user || user.role !== "cliente") {
      res.status(403).json({ message: "Only clients can update balance" });
      return;
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

export async function updateAvailableSlots(
  req: Request,
  res: Response
): Promise<void> {
  const { serviceId, availableSlots } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
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

export async function listServicesByProvider(req: Request, res: Response): Promise<void> {
  const { providerId } = req.params; // Obtém o providerId dos parâmetros da URL

  try {
    // Verifica se o usuário existe e é um prestador
    const user = await User.findById(providerId);

    if (!user || user.role !== "prestador") {
       res
        .status(403)
        .json({ message: "Access denied. You are not a provider." });
        return
    }
    const services = await Service.find({ providerId });

    if (services.length === 0) {
       res
        .status(404)
        .json({ message: "No services found for this provider." });
        return
    }

    // Retorna a lista de serviços
    res.json({ message: "Services retrieved successfully", services });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving services", error });
  }
}

export async function getAllServices(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Encontrar todos os serviços no banco de dados
    const services = await Service.find();

    if (!services) {
      res.status(404).json({ message: "No services found" });
      return;
    }

    // Retornar todos os serviços encontrados
    res.status(200).json({
      message: "Services retrieved successfully",
      services: services,
    });
  } catch (error) {
    // Erro ao buscar os serviços
    res.status(500).json({ message: "Error fetching services", error });
  }
}
