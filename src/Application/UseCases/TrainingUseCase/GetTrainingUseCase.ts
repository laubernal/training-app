import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Domain/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';

export class GetTrainingUseCase {
  constructor(private trainingRepository: ITrainingRepository, private value: string) {}

  public execute(): Training {
    this.checkArgs();

    const trainingDate = TrainingDate.generate(this.value);

    const training = this.trainingRepository.getOneBy('date', trainingDate);

    if (!training) {
      throw new Error('No training found');
    }

    return training;
  }

  private checkArgs(): void {
    if (!this.value) {
      throw new Error('Data is missing');
    }
  }
}
