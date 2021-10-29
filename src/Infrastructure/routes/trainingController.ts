import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { TrainingDate } from '../../Domain/vo/TrainingDate';
import { TrainingRepository } from '../repositories/TrainingRepository';

const router: Router = express.Router();

const trainingRepository = new TrainingRepository();

router.post('/training', (req: Request, res: Response) => {
  try {
    // TO DO - Check if exists a jwt ------------------------
    if (!req.session || !req.session.jwt) {
      throw new Error('Invalid session - training');
    }
    const verifiedToken = jwt.verify(req.session.jwt, 'asdf');
    console.log('verified token', verifiedToken);

    // ------------------------------------------------------

    const { date, exercise } = req.body as { date: string; exercise: any[] };

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(date), exercises);

    // trainingRepository.save(newTraining);
    res.send(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
