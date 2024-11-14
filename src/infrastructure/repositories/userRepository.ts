// infrastructure/repositories/UserRepository.ts
import User, { IUser } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateBalance(id: string, amount: number): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true }
    );
  }
}

export { UserRepository };
