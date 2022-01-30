import { Training } from '../../../Domain/entities/Training';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';
import { IUseCase } from '../IUseCase';
import { ITrainingPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ITrainingPgRepository';

export class GetTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingPgRepository: ITrainingPgRepository) {}

  public async execute(value: string): Promise<Training | undefined> {
    try {
      const trainingDate = TrainingDate.generate(value);

      const training = await this.trainingPgRepository.getOneTrainingBy('tr_date', trainingDate);

      if (!training) {
        return undefined;
      }

      return training;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
