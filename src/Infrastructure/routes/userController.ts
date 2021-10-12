import express, { Request, Response, Router } from 'express';

import { User } from '../../Domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { Password } from '../../Domain/vo/Password';
import { Email } from '../../Domain/vo/Email';
import { Name } from '../../Domain/vo/Name';

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

    const newUser = User.build(
      new Name(firstName),
      new Name(lastName),
      new Email(email),
      new Password(password)
    );

    userRepository.save(newUser);

    res.send('User created');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occured', error: err.message });
  }
});

export { router as user };
