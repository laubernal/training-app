import { Category } from '../../../Domain/entities/Category';
import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { queryResultTraining } from '../../../types';
import { CategoryPgModel } from '../../dataModel/PostgresqlDbModels/CategoryPgModel';
import { ExercisesPgModel } from '../../dataModel/PostgresqlDbModels/ExercisesPgModel';
import { SetsPgModel } from '../../dataModel/PostgresqlDbModels/SetsPgModel';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { IMapper } from '../IMapper';

export class TrainingsPgMapper implements IMapper<TrainingPgModel, Training> {
  public rawDataToModel(rawData: queryResultTraining[]): TrainingPgModel[] {
    const trainings: TrainingPgModel[] = [];
    let exercises: ExercisesPgModel[] = [];
    let sets: SetsPgModel[] = [];

    for (const rawDataElement of rawData) {
      if (trainings.length === 0) {
        this.pushFullTraining(rawDataElement, sets, exercises, trainings);
        continue;
      }

      const lastTrainingModelId = trainings[trainings.length - 1].id;
      const lastExerciseModelId = exercises[exercises.length - 1].id;

      if (this.lastIdIsEqualToActual(lastTrainingModelId, rawDataElement.tr_id)) {
        if (this.lastIdIsEqualToActual(lastExerciseModelId, rawDataElement.ex_id)) {
          this.pushSet(rawDataElement, sets);
          continue;
        }

        this.flushModelArray(sets);

        this.pushFullExercise(rawDataElement, sets, exercises);
        continue;
      }

      this.flushModelArray(sets, exercises);

      this.pushFullTraining(rawDataElement, sets, exercises, trainings);
    }

    return trainings;
  }

  private pushFullExercise(
    rawData: queryResultTraining,
    sets: SetsPgModel[],
    exercises: ExercisesPgModel[]
  ): void {
    this.pushSet(rawData, sets);

    this.pushExercise(rawData, exercises, sets);
  }

  private pushFullTraining(
    rawData: queryResultTraining,
    sets: SetsPgModel[],
    exercises: ExercisesPgModel[],
    trainings: TrainingPgModel[]
  ): void {
    this.pushSet(rawData, sets);

    this.pushExercise(rawData, exercises, sets);

    this.pushTraining(rawData, trainings, exercises);
  }

  private lastIdIsEqualToActual(lastId: string, actualId: string): boolean {
    return lastId === actualId;
  }

  private flushModelArray(
    setsModel: SetsPgModel[],
    exercisesModel?: ExercisesPgModel[] | undefined
  ): void {
    if (setsModel.length !== 0 && exercisesModel?.length !== 0) {
      setsModel = [];
      exercisesModel = [];
    }
    return;
  }

  private pushSet(rawData: queryResultTraining, sets: SetsPgModel[]): void {
    sets.push(
      new SetsPgModel(
        rawData.set_id,
        rawData.set_count,
        rawData.set_reps,
        parseFloat(rawData.set_weight)
      )
    );
  }

  private pushExercise(
    rawData: queryResultTraining,
    exercises: ExercisesPgModel[],
    sets: SetsPgModel[]
  ): void {
    exercises.push(
      new ExercisesPgModel(
        rawData.ex_id,
        rawData.ex_name,
        sets,
        new CategoryPgModel(rawData.cat_id, rawData.cat_name)
      )
    );
  }

  private pushTraining(
    rawData: queryResultTraining,
    trainings: TrainingPgModel[],
    exercises: ExercisesPgModel[]
  ): void {
    trainings.push(
      new TrainingPgModel(
        rawData.tr_id,
        rawData.tr_date,
        rawData.tr_title,
        rawData.tr_note,
        exercises,
        rawData.fk_us_id
      )
    );
  }

  public toDomain(training: TrainingPgModel): Training {
    let exercises: Exercise[] = [];

    if (training.exercises) {
      exercises = training.exercises.map((exerciseMap: any) => {
        const sets = exerciseMap.sets.map((set: any) => {
          return new Set(set.id, set.reps, set.weight, set.setsCount);
        });

        const category = new Category(exerciseMap.category.id, exerciseMap.category.categoryName);

        return new Exercise(exerciseMap.id, category, exerciseMap.exerciseName, sets);
      });
    }

    return new Training(
      training.id,
      training.date,
      training.title,
      training.note,
      exercises,
      training.userId
    );
  }

  public toData(training: Training): TrainingPgModel {
    console.log('to data mapper');

    const exercises = training.exercises.map((exerciseMap: any) => {
      const sets = exerciseMap.sets.map((set: any) => {
        return new SetsPgModel(set.id, set.reps, set.weight, set.setsCount);
      });

      const category = new CategoryPgModel(
        exerciseMap.category.id,
        exerciseMap.category.categoryName
      );

      return new ExercisesPgModel(exerciseMap.id, exerciseMap.exerciseName, sets, category);
    });

    return new TrainingPgModel(
      training.id,
      training.date,
      training.title,
      training.note,
      exercises,
      training.userId
    );
  }
}
