import jwt from 'jsonwebtoken';
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

    const id = userRepository.getId(email);

    const userJwt = jwt.sign(
      {
        id: id,
        email: email,
      },
      'asdf'
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

router.post('/signin', (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    new SignInCase(userRepository, email, password).execute();

    const id = userRepository.getId(email);

    const userJwt = jwt.sign(
      {
        id: id,
        email: email,
      },
      'asdf'
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send('Logged in');
    console.log(userJwt);
  } catch (err: any) {
    console.log(err);
    res.send({
      msg: 'Error occurred',
      error: err.message,
    });
  }
});

router.get('signout', (req: Request, res: Response) => {
  req.session = null;
  res.status(200).send('You are logged out');
});

export { router as user };
