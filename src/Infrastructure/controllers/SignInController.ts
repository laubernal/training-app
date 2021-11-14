import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignInUseCase } from '../../Application/UseCases/AuthUseCase/SignInUseCase';
import { UserRepository } from '../repositories/UserRepository';
import { Controller } from './decorators/controller';
import { post } from './decorators/routes';

const userRepository = new UserRepository();

@Controller()
export class SignInController {
  @post('/signin')
  public signIn(req: Request, res: Response): void {
    try {
      const { email, password } = req.body;

      new SignInUseCase(userRepository).execute(email, password);

      const id = userRepository.getId(email);

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

      res.status(201).send('Logged in');
    } catch (err: any) {
      console.log(err);
      res.send({
        msg: 'Error occurred',
        error: err.message,
      });
    }
  }
}
