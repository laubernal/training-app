import { USERS_JSON } from '../constants';
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { UsersMapper } from '../mappers/UsersMapper';
import { FsRepository } from './FsRepository';

export class UserRepository extends FsRepository<IUser, User> {
  protected mapper = new UsersMapper();

  constructor() {
    super(USERS_JSON);
  }
  
  public create(user: User): void {
    super.create(user);
  }
}
