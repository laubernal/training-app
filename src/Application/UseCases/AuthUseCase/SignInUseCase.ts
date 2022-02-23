import { scryptSync } from 'crypto';

import { IUseCase } from '../IUseCase';
import { Email } from '../../../Domain/vo/Email';
import { IUserPgRepository } from '../../../Domain/interfaces/PostgresqlDbInterfaces/IUserPgRepository';

export class SignInUseCase implements IUseCase<void> {
  constructor(private userPgRepository: IUserPgRepository) {}

  public async execute(email: string, password: string): Promise<void> {
    try {
      const emailValidated = new Email(email);

      const userExists = await this.userPgRepository.getOneBy('us_email', emailValidated.value);

      if (!userExists) {
        throw new Error('This user does not exist');
      }

      if (this.comparePasswords(userExists.password, password) === false) {
        throw new Error('Incorrect password');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private comparePasswords(saved: string, supplied: string): boolean {
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = scryptSync(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }
}
