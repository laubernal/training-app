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

  public comparePasswords(password: string, passwordConfirmation: string) {
    // The password saved in the DB has to be hashed.salt
    // Create a salt using the scryptSync method of crypto module from node
    // Return the hashed password: string
  }
}
