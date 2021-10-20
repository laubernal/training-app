import express, { Request, Response, Router } from 'express';
import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { TrainingRepository } from '../repositories/TrainingRepository';

const router: Router = express.Router();

const trainingRepository = new TrainingRepository();

router.post('/training', (req: Request, res: Response) => {
  try {
    const { date, exercise } = req.body;

    const exercises = exercise.map((exercise: any) => {
      const series = exercise.map((serie: any) => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exercise.exerciseName, series);
    });

    Training.build(date, exercises);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err });
  }
});

export { router as training };
