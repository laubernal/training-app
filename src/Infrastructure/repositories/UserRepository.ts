import { USERS_JSON } from '../../constants';
import { User } from '../../Domain/entities/User';
import { UserModel } from '../../Domain/interfaces/UserModel';
import { UsersMapper } from '../mappers/UsersMapper';
import { FsRepository } from './FsRepository';
import { JsonFileReader } from './JsonFileReader';

export class UserRepository extends FsRepository<UserModel, User> {
  protected mapper = new UsersMapper();

  constructor() {
    super(new JsonFileReader(USERS_JSON));
  }

  public getId(email: string): string {
    const user = this.getOneBy('email', email);
   
    if (!user) {
      throw new Error('User not found');
    }
    
    return user.id;
  }
}
