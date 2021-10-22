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

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((series: any): Serie => {
        return new Serie(series.reps, series.weight, series.seriesCount);
      });
      return new Exercise(exercise.exerciseName, series);
    });

    const newTraining = Training.build(date, exercises);

    trainingRepository.save(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
