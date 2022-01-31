import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { IUseCase } from '../IUseCase';
import { NewTrainingDto } from '../../Dto/NewTrainingDto';
import { ITrainingPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ITrainingPgRepository';
import { ExerciseDto } from '../../Dto/ExerciseDto';
import { SetDto } from '../../Dto/SetDto';
import { CategoryDto } from '../../Dto/CategoryDto';

export class NewTrainingUseCase implements IUseCase<Training> {
  constructor(private trainingPgRepository: ITrainingPgRepository) {}

  public async execute(newTraining: NewTrainingDto): Promise<Training> {
    console.log('use case new training dto: ', newTraining);

    const exercises: Exercise[] = this.dtoToDomain(newTraining.exercise);

    const training: Training = Training.build(
      newTraining.date,
      newTraining.title,
      newTraining.note,
      exercises
    );

    this.trainingPgRepository.save(training);

    // Returning the new training is not correct, waiting for future correction!
    return training;
  }

  private dtoToDomain(exercise: ExerciseDto[]): Exercise[] {
    console.log('before map');

    const exercises = exercise.map((exercise: ExerciseDto): Exercise => {
      const sets = exercise.sets.map((set: SetDto): Set => {
        return Set.build(set.reps, set.weight, set.setsCount);
      });

      // WARNING - FIX CATEGORYNAME!!
      return Exercise.build(exercise.category.categoryName, exercise.exerciseName, sets);
    });

    return exercises;
  }
}
