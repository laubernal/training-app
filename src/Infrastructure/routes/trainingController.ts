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
  if (!req.session || !req.session.jwt) {
    res.send('Invalid session');
    throw new Error('Invalid session - training');
  }

  try {
    jwt.verify(req.session.jwt, TOKEN_KEY);

    const { date, exercise } = req.body as { date: string; exercise: any[] };

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(date), exercises);

    trainingRepository.save(newTraining);
    res.send(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
