import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { IUseCase } from '../IUseCase';
import { NewTrainingRequestDto } from '../../Dto/newTrainingRequestDto';
import { ITrainingPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ITrainingPgRepository';
import { Category } from '../../../Domain/entities/Category';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingPgRepository: ITrainingPgRepository) {}

  // execute receives the newTrainingRequestDto only
  public async execute(
    date: string,
    title: string,
    note: string,
    exerciseRequest: NewTrainingRequestDto[]
  ): Promise<Training> {
    const exercises: Exercise[] = this.mapExerciseToExercises(exerciseRequest);

    const training: Training = Training.build(date, title, note, exercises);

    this.trainingPgRepository.save(training);

    // Returning the new training is not correct, waiting for future correction!
    return training;
  }

  // Change method name
  private mapExerciseToExercises(exerciseRequest: NewTrainingRequestDto[]): Exercise[] {
    const exercises = exerciseRequest.map((exercise: NewTrainingRequestDto): Exercise => {
      const sets = exercise.sets.map((set: Set): Set => {
        return Set.build(set.reps, set.weight, set.setsCount);
      });

      return Exercise.build(exercise.categoryName.categoryName, exercise.exerciseName, sets);
    });

    return exercises;
  }
}
