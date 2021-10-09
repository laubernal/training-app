import express, { Request, Response, Router } from 'express';
import { randomBytes, scryptSync } from 'crypto';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/user', (req: Request, res: Response) => {
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

    const newUser = User.build(firstName, lastName, email, hashPassword(password));

    userRepository.create(newUser);

    res.send('User created');
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err });
  }
});

function hashPassword(password: string): string {
  const salt = randomBytes(8).toString('hex');
  const buf = scryptSync(password, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
}

export { router as user };
