import express, { Request, Response, Router } from 'express';

import { GetTrainingUseCase } from '../../Application/UseCases/TrainingUseCase/GetTrainingUseCase';
import { NewTrainingUseCase } from '../../Application/UseCases/TrainingUseCase/NewTrainingUseCase';
import { requireAuth } from '../middlewares/requireAuth';
import { TrainingRepository } from '../repositories/TrainingRepository';

const router: Router = express.Router();

const trainingRepository = new TrainingRepository();

router.post('/training', requireAuth, (req: Request, res: Response) => {
  try {
    const { date, title, exercise } = req.body as { date: string; title: string; exercise: any[] };

    const newTraining = new NewTrainingUseCase(trainingRepository, date, title, exercise).execute();

    res.send(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

router.get('/training', requireAuth, (req: Request, res: Response) => {
  try {
    const { date } = req.body as { date: string };

    const training = new GetTrainingUseCase(trainingRepository, date).execute();

    res.send(training);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
