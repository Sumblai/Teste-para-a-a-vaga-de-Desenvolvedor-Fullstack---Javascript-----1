// domain/repositories/IServiceRepository.ts
import { IService } from "../entities/Service";

interface IServiceRepository {
  create(service: IService): Promise<IService>;
  findById(id: string): Promise<IService | null>;
  findAll(): Promise<IService[]>;
}

export { IServiceRepository };
