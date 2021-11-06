import jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from 'express';

import { UserRepository } from '../repositories/UserRepository';
import { SignUpUseCase } from '../../Application/UseCases/AuthUseCase/SignUpUseCase';
import { SignInUseCase } from '../../Application/UseCases/AuthUseCase/SignInUseCase';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/signup', (req: Request, res: Response): void => {
  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  try {
    const id = new SignUpUseCase(
      userRepository,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    ).execute();

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
});

router.post('/signin', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  try {
    new SignInUseCase(userRepository, email, password).execute();

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
});

router.get('/signout', (req: Request, res: Response): void => {
  try {
    req.session = null;
    res.status(200).send('You are logged out');
  } catch (err: any) {
    console.log(err);
    res.send({
      msg: 'Error occurred',
      error: err.message,
    });
  }
});

export { router as user };
