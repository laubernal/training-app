import { scryptSync } from 'crypto';

import { IUserRepository } from '../../../Domain/interfaces/IUserRepository';
import { Email } from '../../../Domain/vo/Email';
import { IUseCase } from '../IUseCase';

export class SignInUseCase implements IUseCase<void> {
  constructor(private userRepository: IUserRepository) {}

  public execute(email: string, password: string): void {
    this.checkArgs(email, password);

    const emailValidated = new Email(email);

    const userExists = this.userRepository.getOneBy('email', emailValidated.value);

    if (!userExists) {
      throw new Error('This user does not exist');
    }

    if (this.comparePasswords(userExists.password, password) === false) {
      throw new Error('Incorrect password');
    }
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }

  private checkArgs(email: string, password: string): void {
    if (!email || !password) {
      throw new Error('Some data is missing');
    }
  }
}
