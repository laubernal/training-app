import { Request, Response } from 'express';

import { ExerciseDto } from '../../../Application/Dto/ExerciseDto';
import { NewTrainingDto } from '../../../Application/Dto/NewTrainingDto';
import { NewTrainingUseCase } from '../../../Application/UseCases/TrainingUseCase/NewTrainingUseCase';
import { currentUser, requireAuth } from '../../middlewares/auth';
import { TrainingPgRepository } from '../../repositories/PostgresqlDb/TrainingPgRepository';
import { bodyValidator, Controller, post, use } from '../decorators';

@Controller()
export class NewTrainingController {
  @post('/training')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('date', 'title', 'note', 'exercise')
  public newTraining(req: Request, res: Response): void {
    try {
      const { date, title, note, exercise } = req.body as {
        date: string;
        title: string;
        note: string;
        exercise: ExerciseDto[];
      };

      const newTrainingDto = new NewTrainingDto(date, title, note, exercise, req.currentUser!.id);

      const newTraining = new NewTrainingUseCase(new TrainingPgRepository()).execute(
        newTrainingDto
      );

      res.send(newTraining);
    } catch (err: any) {
      console.log(err);
      res.send({ msg: 'Error occurred', error: err.message });
    }
  }
}
