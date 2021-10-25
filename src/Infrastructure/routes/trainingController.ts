import express, { Request, Response, Router } from 'express';
import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { TrainingRepository } from '../repositories/TrainingRepository';

const router: Router = express.Router();

const trainingRepository = new TrainingRepository();

router.post('/training', (req: Request, res: Response) => {
  try {
    // Check if exists a jwt
    const { date, exercise } = req.body as { date: string; exercise: any[] };

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    console.log(date);    

    const dateTest = new Date(2021, 10, 25);

    console.log(`${dateTest.getDate()}/${dateTest.getMonth()}/${dateTest.getFullYear()}`);

    const newTraining = Training.build(date, exercises);

    trainingRepository.save(newTraining);
  } catch (err: any) {
    console.log(err);
    res.send({ msg: 'Error occurred', error: err.message });
  }
});

export { router as training };
