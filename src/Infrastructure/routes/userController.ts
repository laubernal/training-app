import express, { Request, Response, Router } from 'express';

import { UserRepository } from '../repositories/UserRepository';
import { SignUpUseCase } from '../../Application/UseCases/SignUpUseCase';
import { SignInCase } from '../../Application/UseCases/SignInCase';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/signup', (req: Request, res: Response) => {
  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  try {
    new SignUpUseCase(
      userRepository,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    ).execute();

    req.session!.userId = userRepository.getId(email);

    res.send('User created');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err.message });
  }
});

router.post('/signin', (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    new SignInCase(userRepository, email, password).execute();

    req.session!.userId = userRepository.getId(email);

    res.send('Logged in');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

router.get('signout', (req: Request, res: Response) => {
  req.session = null;
  res.send('You are logged out');
});

export { router as user };
