import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { GetTrainingCase } from '../../Application/UseCases/GetTrainingCase';
import { NewTrainingCase } from '../../Application/UseCases/NewTrainingCase';

import { TOKEN_KEY } from '../../constants';
import { TrainingRepository } from '../repositories/TrainingRepository';

const router: Router = express.Router();

const trainingRepository = new TrainingRepository();

router.post('/training', (req: Request, res: Response) => {
  // Create middleware to check the session
  if (!req.session || !req.session.jwt) {
    res.send('Invalid session');
    throw new Error('Invalid session - training');
  }

  try {
    jwt.verify(req.session.jwt, TOKEN_KEY);

    const { date, title, exercise } = req.body as { date: string; title: string; exercise: any[] };

    const newTraining = new NewTrainingCase(trainingRepository, date, title, exercise);

    res.send(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

router.get('/training', (req: Request, res: Response) => {
  // Create middleware to check the session
  if (!req.session || !req.session.jwt) {
    res.send('Invalid session');
    throw new Error('Invalid session - training');
  }

  try {
    jwt.verify(req.session.jwt, TOKEN_KEY);

    const { date } = req.body as { date: string };

    const training = new GetTrainingCase(trainingRepository, date).execute();

    res.send(training);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
