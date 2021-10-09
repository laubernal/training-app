import { scryptSync } from 'crypto';

import { USERS_JSON } from '../../constants';
import { User } from '../../Domain/entities/User';
import { IUser } from '../../Domain/interfaces/IUser';
import { UsersMapper } from '../mappers/UsersMapper';
import { FsRepository } from './FsRepository';
import { JsonFileReader } from './JsonFileReader';

export class UserRepository extends FsRepository<IUser, User> {
  protected mapper = new UsersMapper();

  constructor() {
    super(new JsonFileReader(USERS_JSON));
  }

  // This is a use case
  public comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
