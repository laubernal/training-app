import { Request, Response } from 'express';
import { NewTrainingUseCase } from '../../../Application/UseCases/TrainingUseCase/NewTrainingUseCase';
import { requireAuth } from '../../middlewares/requireAuth';
import { TrainingPgRepository } from '../../repositories/PostgresqlDb/TrainingPgRepository';
import { bodyValidator, Controller, post, use } from '../decorators';

@Controller()
export class NewTrainingController {
  @post('/training')
  @use(requireAuth)
  @bodyValidator('date', 'title', 'exercise')
  public newTraining(req: Request, res: Response): void {
    try {
      const { date, title, note, exercise } = req.body as {
        date: string;
        title: string;
        note: string;
        exercise: any[];
      };

      const newTraining = new NewTrainingUseCase(new TrainingPgRepository()).execute(
        date,
        title,
        note,
        exercise
      );

      res.send(newTraining);
    } catch (err: any) {
      console.log(err);
      res.send({ msg: 'Error occurred', error: err.message });
    }
  }
}
