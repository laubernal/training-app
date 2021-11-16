import { Request, Response } from 'express';
import { NewTrainingUseCase } from '../../../Application/UseCases/TrainingUseCase/NewTrainingUseCase';
import { requireAuth } from '../../middlewares/requireAuth';
import { TrainingRepository } from '../../repositories/TrainingRepository';
import { bodyValidator, Controller, post, use } from '../decorators';

@Controller()
export class NewTrainingController {
  @post('/training')
  @use(requireAuth)
  @bodyValidator('date', 'title', 'exercise')
  public newTraining(req: Request, res: Response): void {
    try {
      const { date, title, exercise } = req.body as {
        date: string;
        title: string;
        exercise: any[];
      };

      const newTraining = new NewTrainingUseCase(new TrainingRepository()).execute(
        date,
        title,
        exercise
      );

      res.send(newTraining);
    } catch (err: any) {
      console.log(err);
      res.send({ msg: 'Error occurred', error: err.message });
    }
  }
}
