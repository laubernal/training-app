import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignUpUseCase } from '../../../Application/UseCases/AuthUseCase/SignUpUseCase';
import { UserPgRepository } from '../../repositories/PostgresqlDb/UserPgRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { bodyValidator, Controller, post } from '../decorators';

// const userRepository = new UserRepository();
const userPgRepository = new UserPgRepository();

@Controller()
export class SignUpController {
  @post('/signup')
  @bodyValidator('firstName', 'lastName', 'email', 'password', 'passwordConfirmation')
  public signUp(req: Request, res: Response): void {
    try {
      const { firstName, lastName, email, password, passwordConfirmation } = req.body;

      const id = new SignUpUseCase(userPgRepository).execute(
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
      );

      const userJwt = jwt.sign(
        {
          id: id,
          email: email,
        },
        process.env.TOKEN_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.send('User created');
    } catch (err: any) {
      console.log(err);
      res.send({
        msg: 'Error occured',
        error: err.message,
      });
    }
  }
}
