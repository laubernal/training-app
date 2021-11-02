import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../../constants';
import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { TrainingDate } from '../../Domain/vo/TrainingDate';
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

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(date), title, exercises);    

    trainingRepository.save(newTraining);
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

    const trainingDate = TrainingDate.generate(date);

    // ¿Debería hacer un use case para esto?
    const training = trainingRepository.getOneBy('date', trainingDate);

    if (training === undefined) {
      throw new Error('No training found');
    }

    res.send(training);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
