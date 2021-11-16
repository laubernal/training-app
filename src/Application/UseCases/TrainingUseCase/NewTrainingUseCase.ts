import { Exercise } from '../../../Domain/entities/Exercise';
import { Serie } from '../../../Domain/entities/Serie';
import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Infrastructure/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';
import { IUseCase } from '../IUseCase';
import { NewTrainingRequestDto } from '../../Dto/newTrainingRequestDto';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingRepository: ITrainingRepository) {}

  public execute(date: string, title: string, exercise: Exercise[]): Training {
    // const exercises = this.mapTrainingsToExercises(exercise)

    const exercises = exercise.map((exerciseMap: Exercise): Exercise => {
      const series = exerciseMap.series.map((serie: Serie): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    const newTraining = Training.build(TrainingDate.generate(date), title, exercises);

    this.trainingRepository.save(newTraining);

    // Returning the new training is not correct, waiting for future correction!
    return newTraining;
  }

  private mapTrainingsToExercises(trainings: NewTrainingRequestDto[]) {
    // const exercises = exercise.map((exerciseMap: Exercise): Exercise => {
    //   const series = exerciseMap.series.map((serie: Serie): Serie => {
    //     return new Serie(serie.reps, serie.weight, serie.seriesCount);
    //   });
    //   return new Exercise(exerciseMap.exerciseName, series);
    // });
  }
}
