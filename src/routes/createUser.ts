import express, { Request, Response, Router } from 'express';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/create/user', (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName && lastName && email && password)) {
    res.send('Some data is missing');
    return;
  }

  try {
    const userCheck = userRepository.getOneBy('email', email);

    if (userCheck) {
      res.send('The user already exists');
      return;
    }

    const newUser = User.build(firstName, lastName, email, password);

    userRepository.create(newUser);

    res.send('User created');
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err });
  }
});

export { router as createUser };
