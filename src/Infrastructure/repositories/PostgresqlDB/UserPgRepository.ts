import { USERS_TABLENAME } from '../../../constants';
import { User } from '../../../Domain/entities/User';
import { UserPgModel } from '../../dataModel/PostgresqlDbModels/UserPgModel';
import { UsersPgMapper } from '../../mappers/PostgresqlDbMappers/UsersPgMapper';
import { PostgreRepository } from './PostgreRepository';
import { Database } from './Database';

export class UserPgRepository extends PostgreRepository<UserPgModel, User> {
  protected mapper = new UsersPgMapper();

  constructor() {
    super(USERS_TABLENAME);
  }

  public async save(user: User): Promise<void> {
    try {
      const newUser = this.mapper.toData(user);

      const userValues = Object.values(newUser);

      const preparedStatements = userValues
        .map((_: any, index: number) => {
          return `$${index + 1}`;
        })
        .join(', ');

      await Database.query(
        `INSERT INTO ${USERS_TABLENAME} (us_id, us_first_name, us_last_name, us_email, us_password) VALUES (${preparedStatements})`,
        [...userValues]
      );
    } catch (error: any) {
      throw new Error(`UserPgRepository - Save user error ${error.message}`);
    }
  }

  public async getId(email: string): Promise<string> {
    try {
      const user = await this.getOneBy('us_email', email);

      if (!user) {
        throw new Error('User not found');
      }

      return user.id;
    } catch (error: any) {
      throw new Error(`UserPgRepository - Get id error ${error.message}`);
    }
  }
}
