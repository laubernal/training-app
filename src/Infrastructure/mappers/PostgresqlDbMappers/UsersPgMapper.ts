import { User } from '../../../Domain/entities/User';
import { UserPgModel } from '../../dataModel/PostgresqlDbModels/UserPgModel';
import { IMapper } from '../IMapper';

export class UsersPgMapper implements IMapper<UserPgModel, User> {
  public toDomain(user: UserPgModel): User {
    return new User(
      user.us_id,
      user.us_first_name,
      user.us_last_name,
      user.us_email,
      user.us_password
    );
  }

  public toData(user: User): UserPgModel {
    return {
      us_id: user.id,
      us_first_name: user.firstName,
      us_last_name: user.lastName,
      us_email: user.email,
      us_password: user.password,
    };
  }
}
