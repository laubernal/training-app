import { scryptSync } from 'crypto';

import { IUserRepository } from '../../../Domain/interfaces/IUserRepository';
import { Email } from '../../../Domain/vo/Email';
import { IUseCase } from '../IUseCase';

export class SignInUseCase implements IUseCase<void> {
  constructor(
    private userRepository: IUserRepository,
    private email: string,
    private password: string
  ) {}

  public execute(): void {
    this.checkArgs();

    const emailValidated = new Email(this.email);

    const userExists = this.userRepository.getOneBy('email', emailValidated.value);

    if (!userExists) {
      throw new Error('This user does not exist');
    }

    if (this.comparePasswords(userExists.password, this.password) === false) {
      throw new Error('Incorrect password');
    }
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }

  private checkArgs(): void {
    if (!this.email || !this.password) {
      throw new Error('Some data is missing');
    }
  }
}
