import { User } from '../../Domain/entities/User';
import { IFsRepository } from './IFsRepository';

export interface IUserRepository extends IFsRepository<User> {
  getId(email: string): string;
}
