import express, { Request, Response, Router } from 'express';
import { randomBytes, scryptSync } from 'crypto';

import { User } from '../../Domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { Password } from '../../Domain/vo/Password';
import { Email } from '../../Domain/vo/Email';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/user', (req: Request, res: Response) => {
  const { firstName, lastName, email, password, passwordConfirmation } = req.body;

  if (!(firstName || lastName || email || password || passwordConfirmation)) {
    res.send('Some data is missing');
    return;
  }

  try {
    const userExists = userRepository.getOneBy('email', email);

    if (userExists) {
      res.send('The user already exists');
      return;
    }
    // Use case
    if (password !== passwordConfirmation) {
      res.send('Passwords must match');
      return;
    }

    const emailValidated = new Email(email).value;
    const passwordValidated = new Password(password).value;

    const newUser = User.build(firstName, lastName, emailValidated, hashPassword(passwordValidated));

    userRepository.save(newUser);

    res.send('User created');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err.message });
  }
});

function hashPassword(password: string): string {
  const salt = randomBytes(8).toString('hex');
  const buf = scryptSync(password, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
}

export { router as user };
