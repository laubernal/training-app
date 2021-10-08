import { randomBytes, scryptSync } from 'crypto';

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

  public create(user: User): void {
    const newUser = this.mapper.toData(user);

    const salt = randomBytes(8).toString('hex');
    const buf = scryptSync(newUser.password, salt, 64);

    newUser.password = `${buf.toString('hex')}.${salt}`;
    console.log(newUser);
    

    this.readerData.push(newUser);
    this.save();
  }

  public comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
