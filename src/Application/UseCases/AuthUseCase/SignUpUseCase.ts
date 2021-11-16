import { IUseCase } from '../IUseCase';
import { User } from '../../../Domain/entities/User';
import { Password } from '../../../Domain/vo/Password';
import { Email } from '../../../Domain/vo/Email';
import { Name } from '../../../Domain/vo/Name';
import { IUserRepository } from '../../../Infrastructure/interfaces/IUserRepository';

export class SignUpUseCase implements IUseCase<string> {
  constructor(private userRepository: IUserRepository) {}

  public execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): string {
    const emailValidated = new Email(email);
    const userExists = this.userRepository.getOneBy('email', emailValidated.value);

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

    this.userRepository.save(newUser);
    return this.userRepository.getId(emailValidated.value);
  }
}
