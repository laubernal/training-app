import { Request, Response } from 'express';
import { GetTrainingUseCase } from '../../../Application/UseCases/TrainingUseCase/GetTrainingUseCase';
import { requireAuth } from '../../middlewares/requireAuth';
import { TrainingRepository } from '../../repositories/TrainingRepository';
import { bodyValidator, Controller, get, use } from '../decorators';

@Controller()
export class GetTrainingBy {
  @get('/training')
  @use(requireAuth)
  @bodyValidator('date')
  public getTrainingBy(req: Request, res: Response): void {
    try {
      const { date } = req.body as { date: string };

      const training = new GetTrainingUseCase(new TrainingRepository()).execute(date);

      res.send(training);
    } catch (err: any) {
      console.log(err);
      res.send({ msg: 'Error occurred', error: err.message });
    }
  }
}
