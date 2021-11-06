import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Domain/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';

export class GetTrainingUseCase {
  constructor(private trainingRepository: ITrainingRepository) {}

  public execute(value: string): Training {
    this.checkArgs(value);

    const trainingDate = TrainingDate.generate(value);

    const training = this.trainingRepository.getOneBy('date', trainingDate);

    if (!training) {
      throw new Error('No training found');
    }

    return training;
  }

  private checkArgs(value: string): void {
    if (!value) {
      throw new Error('Data is missing');
    }
  }
}
