import { User } from '../entities/User';
import { IFsRepository } from './IFsRepository';

export interface IUserRepository extends IFsRepository<User> {
  getId(email: string): string;
}
