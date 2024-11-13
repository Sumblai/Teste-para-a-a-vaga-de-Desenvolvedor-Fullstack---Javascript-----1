import { IUser } from "../entities/User";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
