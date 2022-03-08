import { User } from '../../entities/User';
import { IPostgreRepository } from './IPostgreRepository';

export interface IUserPgRepository extends IPostgreRepository<User> {
  save(user: User): Promise<void>;
  getId(email: string): Promise<string>;
}
