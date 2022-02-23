import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { IUseCase } from '../IUseCase';
import { NewTrainingDto } from '../../Dto/NewTrainingDto';
import { ITrainingPgRepository } from '../../../Domain/interfaces/PostgresqlDbInterfaces/ITrainingPgRepository';
import { ExerciseDto } from '../../Dto/ExerciseDto';
import { SetDto } from '../../Dto/SetDto';
import { Category } from '../../../Domain/entities/Category';
import { ExerciseName } from '../../../Domain/vo/ExerciseName';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingPgRepository: ITrainingPgRepository) {}

  public async execute(newTraining: NewTrainingDto): Promise<Training> {
    try {
      const exercises = await this.dtoToDomain(newTraining.exercise);

      const training: Training = Training.build(
        newTraining.date,
        newTraining.title,
        newTraining.note,
        exercises,
        newTraining.userId
      );

      await this.trainingPgRepository.save(training);

      // Returning the new training is not correct, waiting for future correction!
      return training;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async dtoToDomain(exercise: ExerciseDto[]): Promise<Exercise[]> {
    const exercises = await Promise.all(
      exercise.map((exercise: ExerciseDto): Exercise => {
        const sets = exercise.sets.map((set: SetDto): Set => {
          return Set.build(set.reps, set.weight, set.setsCount);
        });

        const category = new Category(exercise.category.id, exercise.category.categoryName);

        const exerciseName = new ExerciseName(exercise.exerciseName);

        return Exercise.build(category, exerciseName, sets);
      })
    );

    return exercises;
  }
}
