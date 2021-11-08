import { Exercise } from '../../../Domain/entities/Exercise';
import { Serie } from '../../../Domain/entities/Serie';
import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Domain/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';
import { IUseCase } from '../IUseCase';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingRepository: ITrainingRepository) {}

  public execute(date: string, title: string, exercise: any[]): Training {
    this.checkArgs(date, title, exercise);

    const exercises = exercise.map((exerciseMap: any): Exercise => {
      const series = exerciseMap.series.map((serie: any): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(date), title, exercises);

    this.trainingRepository.save(newTraining);

    // Returning the new training is not correct, waiting for future correction!
    return newTraining;
  }

  private checkArgs(date: string, title: string, exercise: any[]): void {
    if (!date || !title || !exercise) {
      throw new Error('Some data is missing');
    }
  }
}
