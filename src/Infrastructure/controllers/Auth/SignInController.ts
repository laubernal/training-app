import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignInUseCase } from '../../../Application/UseCases/AuthUseCase/SignInUseCase';
import { UserPgRepository } from '../../repositories/PostgresqlDb/UserPgRepository';
import { bodyValidator, Controller, post } from '../decorators';

@Controller()
export class SignInController {
  @post('/signin')
  @bodyValidator('email', 'password')
  public async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userPgRepository = new UserPgRepository();

      await new SignInUseCase(userPgRepository).execute(email, password);

      const id = await userPgRepository.getId(email);

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
