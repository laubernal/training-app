import { User } from '../../../Domain/entities/User';
import { UserPgModel } from '../../dataModel/PostgresqlDbModels/UserPgModel';
import { IMapper } from '../IMapper';

export class UsersPgMapper implements IMapper<UserPgModel, User> {
  public rawDataToModel(user: any): UserPgModel[] {
    const userToModel = [];

    userToModel.push(
      new UserPgModel(
        user.us_id,
        user.us_first_name,
        user.us_last_name,
        user.us_email,
        user.us_password
      )
    );

    return userToModel;
  }

  public toDomain(user: UserPgModel): User {
    return new User(user.id, user.firstName, user.lastName, user.email, user.password);
  }

  public toData(user: User): UserPgModel {
    return new UserPgModel(user.id, user.firstName, user.lastName, user.email, user.password);
  }
}
