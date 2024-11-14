// infrastructure/repositories/ServiceRepository.ts
import Service, { IService } from "../../domain/entities/Service";
import { IServiceRepository } from "../../domain/repositories/IServiceRepository";

class ServiceRepository implements IServiceRepository {
  async create(service: IService): Promise<IService> {
    return await Service.create(service);
  }

  async findById(id: string): Promise<IService | null> {
    return await Service.findById(id);
  }

  async findAll(): Promise<IService[]> {
    return await Service.find();
  }
}

export { ServiceRepository };
