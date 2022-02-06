import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { IUseCase } from '../IUseCase';
import { NewTrainingDto } from '../../Dto/NewTrainingDto';
import { ITrainingPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ITrainingPgRepository';
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

      this.trainingPgRepository.save(training);

      // Returning the new training is not correct, waiting for future correction!
      return training;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async dtoToDomain(exercise: ExerciseDto[]): Promise<Exercise[]> {
    const exercises = await Promise.all(
      exercise.map(async (exercise: ExerciseDto): Promise<Exercise> => {
        const sets = exercise.sets.map((set: SetDto): Set => {
          return Set.build(set.reps, set.weight, set.setsCount);
        });

        const categoryName = Category.build(exercise.categoryName);

        const exerciseName = new ExerciseName(exercise.exerciseName);

        // Check if the exercise already exists
        const exerciseFound = await this.trainingPgRepository.findExercise(exerciseName.value);

        // If the exercise exists build the Exercise with the id and name of the exercise found
        if (exerciseFound) {
          const { ex_id, ex_name } = exerciseFound;
          console.log('exerciseFound: ', ex_id, ex_name);

          return Exercise.build(categoryName, ex_name, sets);
        }

        // If not found, build the Exercise from scratch
        return Exercise.build(categoryName, exerciseName, sets);
      })
    );

    return exercises;
  }
}
