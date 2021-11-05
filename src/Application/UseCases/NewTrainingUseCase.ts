import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { ITrainingRepository } from '../../Domain/interfaces/ITrainingRepository';
import { TrainingDate } from '../../Domain/vo/TrainingDate';

export class NewTrainingUseCase {
  constructor(
    private trainingRepository: ITrainingRepository,
    private date: string,
    private title: string,
    private exercise: any[]
  ) {}

  public execute(): Training {
    this.checkArgs();

    const exercises = this.exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(this.date), this.title, exercises);

    this.trainingRepository.save(newTraining);

    // Returning the new training is not correct, waiting for future correction!
    return newTraining;
  }

  private checkArgs(): void {
    if (!this.date || !this.title || !this.exercise) {
      throw new Error('Some data is missing');
    }
  }
}
