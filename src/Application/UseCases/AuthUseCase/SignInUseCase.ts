import { scryptSync } from 'crypto';

import { IUserRepository } from '../../../Infrastructure/interfaces/IUserRepository';
import { IUseCase } from '../IUseCase';
import { Email } from '../../../Domain/vo/Email';
import { IUserPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/IUserPgRepository';

export class SignInUseCase implements IUseCase<void> {
  // constructor(private userRepository: IUserRepository) {}
  constructor(private userPgRepository: IUserPgRepository) {}

  public async execute(email: string, password: string): Promise<void> {
    const emailValidated = new Email(email);

    // const userExists = this.userRepository.getOneBy('email', emailValidated.value);
    const userExists = await this.userPgRepository.getOneBy('us_email', emailValidated.value);

    if (!userExists) {
      throw new Error('This user does not exist');
    }

    // if (this.comparePasswords(userExists.password, password) === false) {
    //   throw new Error('Incorrect password');
    // }
  }

  // private comparePasswords(saved: string, supplied: string): boolean {
  //   const [hashed, salt] = saved.split('.');
  //   console.log(hashed, salt);

  //   const suppliedHashedBuf = scryptSync(supplied, salt, 64);

  //   return hashed === suppliedHashedBuf.toString('hex');
  // }
}
