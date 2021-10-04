import { USERS_JSON } from '../constants';
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { UsersMapper } from '../mappers/UsersMapper';
import { FsRepository } from './FsRepository';
import { JsonFileReader } from './JsonFileReader';

export class UserRepository extends FsRepository<IUser, User> {
  protected mapper = new UsersMapper();

  constructor() {
    super(new JsonFileReader(USERS_JSON));
  }
}
