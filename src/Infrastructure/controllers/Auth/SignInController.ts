import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { SignInUseCase } from '../../../Application/UseCases/AuthUseCase/SignInUseCase';
import { UserPgRepository } from '../../repositories/PostgresqlDb/UserPgRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { bodyValidator, Controller, post } from '../decorators';

@Controller()
export class SignInController {
  @post('/signin')
  @bodyValidator('email', 'password')
  public async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // const userRepository = new UserRepository();
      const userPgRepository = new UserPgRepository();

      //PRUEBAS-------------------
      // const user = await userPgRepository.getOneBy('us_id', '1');
      // console.log('result', user);

      // userPgRepository.save('us_id, us_first_name, us_last_name, us_email, us_password', [
      //   '4',
      //   'Demonitu',
      //   'Demonil',
      //   'demonitu@gmail.com',
      //   'password',
      // ]);

      //FIN PRUEBAS---------------------

      // new SignInUseCase(userRepository).execute(email, password);
      await new SignInUseCase(userPgRepository).execute(email, password);

      // const id = userRepository.getId(email);
      // const id = userPgRepository.getId(email);

      // const userJwt = jwt.sign(
      //   {
      //     id: id,
      //     email: email,
      //   },
      //   process.env.TOKEN_KEY!
      // );

      // req.session = {
      //   jwt: userJwt,
      // };

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
