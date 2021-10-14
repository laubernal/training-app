import express, { Request, Response, Router } from 'express';

import { UserRepository } from '../repositories/UserRepository';
import { SignUpUseCase } from '../../Application/UseCases/SignUpUseCase';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/user', (req: Request, res: Response) => {
  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  try {
    new SignUpUseCase(userRepository, firstName, lastName, email, password, passwordConfirmation);
    res.send('User created');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err.message });
  }
});

export { router as user };
