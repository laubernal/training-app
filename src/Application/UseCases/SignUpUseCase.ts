import { IUseCase } from './IUseCase';
import { User } from '../../Domain/entities/User';
import { Password } from '../../Domain/vo/Password';
import { Email } from '../../Domain/vo/Email';
import { Name } from '../../Domain/vo/Name';
import { IUserRepository } from '../../Domain/interfaces/IUserRepository';

export class SignUpUseCase implements IUseCase<void> {
  constructor(
    private userRepository: IUserRepository,
    private firstName: string,
    private lastName: string,
    private email: string,
    private password: string,
    private passwordConfirmation: string
  ) {}

  public execute(): string {
    this.checkArgs();

    const emailValidated = new Email(this.email);
    const userExists = this.userRepository.getOneBy('email', emailValidated.value);

    if (userExists) {
      throw new Error('This user already exists');
    }

    if (this.password !== this.passwordConfirmation) {
      throw new Error('Passwords must match');
    }

    const newUser = User.build(
      new Name(this.firstName),
      new Name(this.lastName),
      emailValidated,
      new Password(this.password)
    );

    this.userRepository.save(newUser);
    return this.userRepository.getId(emailValidated.value);
  }

  private checkArgs(): void {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.passwordConfirmation
    ) {
      throw new Error('Some data is missing');
    }
  }
}
