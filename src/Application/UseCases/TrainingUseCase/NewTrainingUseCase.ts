import { Exercise } from '../../../Domain/entities/Exercise';
import { Serie } from '../../../Domain/entities/Serie';
import { Training } from '../../../Domain/entities/Training';
import { ITrainingRepository } from '../../../Infrastructure/interfaces/ITrainingRepository';
import { TrainingDate } from '../../../Domain/vo/TrainingDate';
import { IUseCase } from '../IUseCase';
import { NewTrainingRequestDto } from '../../Dto/newTrainingRequestDto';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingRepository: ITrainingRepository) {}

  public async execute(
    date: string,
    title: string,
    exerciseRequest: NewTrainingRequestDto[]
  ): Promise<Training> {
    const exercises: Exercise[] = this.mapExerciseToExercises(exerciseRequest);

    const training: Training = Training.build(TrainingDate.generate(date), title, exercises);

    this.trainingRepository.save(training);

    // Returning the new training is not correct, waiting for future correction!
    return training;
  }

  private mapExerciseToExercises(exerciseRequest: NewTrainingRequestDto[]): Exercise[] {
    const exercises = exerciseRequest.map((exercise: NewTrainingRequestDto): Exercise => {
      const series = exercise.series.map((serie: Serie): Serie => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exercise.exerciseName, series);
    });

    return exercises;
  }
}
