import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Infrastructure/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';
import { IUseCase } from '../IUseCase';

export class GetTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingRepository: ITrainingRepository) {}

  public execute(value: string): Training {
    const trainingDate = TrainingDate.generate(value);

    const training = this.trainingRepository.getOneBy('date', trainingDate);

    if (!training) {
      throw new Error('No training found');
    }

    return training;
  }
}
