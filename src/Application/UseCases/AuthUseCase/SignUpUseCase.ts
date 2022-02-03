import { IUseCase } from '../IUseCase';
import { User } from '../../../Domain/entities/User';
import { Password } from '../../../Domain/vo/Password';
import { Email } from '../../../Domain/vo/Email';
import { Name } from '../../../Domain/vo/Name';
import { IUserPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/IUserPgRepository';

export class SignUpUseCase implements IUseCase<string> {
  constructor(private userPgRepository: IUserPgRepository) {}

  public async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<string> {
    try {
      const emailValidated = new Email(email);
      const userExists = await this.userPgRepository.getOneBy('us_email', emailValidated.value);

      if (userExists) {
        throw new Error('This user already exists');
      }

      if (password !== passwordConfirmation) {
        throw new Error('Passwords must match');
      }

      const newUser = User.build(
        new Name(firstName),
        new Name(lastName),
        emailValidated,
        new Password(password)
      );

      await this.userPgRepository.save(newUser);
      return await this.userPgRepository.getId(emailValidated.value);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
