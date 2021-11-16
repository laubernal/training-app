import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignUpUseCase } from '../../../Application/UseCases/AuthUseCase/SignUpUseCase';
import { UserRepository } from '../../repositories/UserRepository';
import { Controller, post } from '../decorators';

const userRepository = new UserRepository();

@Controller()
export class SignUpController {
  @post('/signup')
  public signUp(req: Request, res: Response): void {
    try {
      const { firstName, lastName, email, password, passwordConfirmation } = req.body;

      const id = new SignUpUseCase(userRepository).execute(
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
