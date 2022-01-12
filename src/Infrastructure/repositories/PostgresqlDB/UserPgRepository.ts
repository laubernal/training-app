import { User } from '../../../Domain/entities/User';
import { UserPgModel } from '../../dataModel/PostgresqlDbModels/UserPgModel';
import { UsersPgMapper } from '../../mappers/PostgresqlDbMappers/UsersPgMapper';
import { PostgreRepository } from './PostgreRepository';

export class UserPgRepository extends PostgreRepository<UserPgModel, User> {
  protected mapper = new UsersPgMapper();

  constructor() {
    super('users');
  }

  public async getId(email: string): Promise<User> {
    const user = await this.getOneBy('us_email', email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
