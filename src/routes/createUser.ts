import express, { Request, Response, Router } from 'express';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

const router: Router = express.Router();

const userRepository = new UserRepository();

router.post('/create/user', (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = User.build(firstName, lastName, email, password);

  userRepository.create(newUser);
});

export { router as createUser };
