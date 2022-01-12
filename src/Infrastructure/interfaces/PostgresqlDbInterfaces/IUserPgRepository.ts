import { User } from '../../../Domain/entities/User';
import { IPostgreRepository } from './IPostgreRepository';

export interface IUserPgRepository extends IPostgreRepository<User> {
  getId(email: string): Promise<any>;
}
