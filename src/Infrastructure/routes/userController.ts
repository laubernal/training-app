import express, { Request, Response, Router } from 'express';
import session from 'express-session';

import { UserRepository } from '../repositories/UserRepository';
import { SignUpUseCase } from '../../Application/UseCases/SignUpUseCase';
import { SignInCase } from '../../Application/UseCases/SignInCase';

const router: Router = express.Router();
const sess = { secret: 'asjk', cookie: {} };
router.use(session(sess));

router.use(session());

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

    // Create session
    req.session.userId = userRepository.getId(email);
    res.send('Log in');
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as user };
