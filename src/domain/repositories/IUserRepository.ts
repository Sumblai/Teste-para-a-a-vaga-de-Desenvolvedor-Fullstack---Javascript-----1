// domain/repositories/IUserRepository.ts
import { IUser } from "../entities/User";

interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updateBalance(id: string, amount: number): Promise<IUser | null>;
}

export { IUserRepository };
