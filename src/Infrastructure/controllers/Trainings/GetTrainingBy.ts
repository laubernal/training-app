import { Request, Response } from 'express';
import { GetTrainingUseCase } from '../../../Application/UseCases/TrainingUseCase/GetTrainingUseCase';
import { requireAuth } from '../../middlewares/requireAuth';
import { TrainingPgRepository } from '../../repositories/PostgresqlDb/TrainingPgRepository';
import { bodyValidator, Controller, get, use } from '../decorators';

@Controller()
export class GetTrainingBy {
  @get('/training')
  @use(requireAuth)
  @bodyValidator('date')
  public async getTrainingBy(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.body as { date: string };

      const training = await new GetTrainingUseCase(new TrainingPgRepository()).execute(date);

      if (!training) {
        res.send(`We do not have any training for this date ${date}`);
      }

      res.send(training);
    } catch (err: any) {
      console.log(err);
      res.send({ msg: 'Error occurred', error: err.message });
    }
  }
}
