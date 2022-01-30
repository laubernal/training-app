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

    rawData.map((rawData: queryResultTraining, index: number) => {
      if (index === 0) {
        this.pushSet(
          sets,
          rawData.set_id,
          rawData.set_count,
          rawData.set_reps,
          parseFloat(rawData.set_weight)
        );

        this.pushExercise(
          exercises,
          rawData.ex_id,
          rawData.ex_name,
          sets,
          rawData.cat_id,
          rawData.cat_name
        );

        this.pushTraining(
          trainings,
          rawData.tr_id,
          rawData.tr_date,
          rawData.tr_title,
          rawData.tr_note,
          exercises
        );
      } else {
        const lastTrainingModelId = trainings[trainings.length - 1].id;
        const lastExerciseModelId = exercises[exercises.length - 1].id;

        if (lastTrainingModelId === rawData.tr_id) {
          if (lastExerciseModelId === rawData.ex_id) {
            this.pushSet(
              sets,
              rawData.set_id,
              rawData.set_count,
              rawData.set_reps,
              parseFloat(rawData.set_weight)
            );
          } else {
            if (sets.length !== 0) {
              sets = [];
            }

            this.pushSet(
              sets,
              rawData.set_id,
              rawData.set_count,
              rawData.set_reps,
              parseFloat(rawData.set_weight)
            );

            this.pushExercise(
              exercises,
              rawData.ex_id,
              rawData.ex_name,
              sets,
              rawData.cat_id,
              rawData.cat_name
            );
          }
        } else {
          if (sets.length !== 0 && exercises.length !== 0) {
            sets = [];
            exercises = [];
          }

          this.pushSet(
            sets,
            rawData.set_id,
            rawData.set_count,
            rawData.set_reps,
            parseFloat(rawData.set_weight)
          );

          this.pushExercise(
            exercises,
            rawData.ex_id,
            rawData.ex_name,
            sets,
            rawData.cat_id,
            rawData.cat_name
          );

          this.pushTraining(
            trainings,
            rawData.tr_id,
            rawData.tr_date,
            rawData.tr_title,
            rawData.tr_note,
            exercises
          );
        }
      }
    });

    return trainings;
  }

  private pushSet(
    sets: SetsPgModel[],
    setId: string,
    setCount: number,
    setReps: number,
    setWeight: number
  ): void {
    sets.push(new SetsPgModel(setId, setCount, setReps, setWeight));
  }

  private pushExercise(
    exercises: ExercisesPgModel[],
    exerciseId: string,
    exerciseName: string,
    sets: SetsPgModel[],
    categoryId: string,
    categoryName: string
  ): void {
    exercises.push(
      new ExercisesPgModel(
        exerciseId,
        exerciseName,
        sets,
        new CategoryPgModel(categoryId, categoryName)
      )
    );
  }

  private pushTraining(
    trainings: TrainingPgModel[],
    trainingId: string,
    trainingDate: string,
    trainingTitle: string,
    trainingNote: string,
    exercises: ExercisesPgModel[]
  ): void {
    trainings.push(
      new TrainingPgModel(trainingId, trainingDate, trainingTitle, trainingNote, exercises)
    );
  }

  public toDomain(training: TrainingPgModel): Training {
    let exercises: Exercise[] = [];

    if (training.exercises) {
      exercises = training.exercises.map((exerciseMap: any) => {
        const sets = exerciseMap.sets.map((set: any) => {
          return new Set(set.reps, set.weight, set.setsCount);
        });

        const category = new Category(exerciseMap.category.categoryName);

        return new Exercise(category, exerciseMap.exerciseName, sets);
      });
    }

    return new Training(training.id, training.date, training.title, training.note, exercises);
  }

  public toData(training: Training): TrainingPgModel {
    console.log('to data mapper');

    const exercises = training.exercises.map((exerciseMap: any) => {
      const sets = exerciseMap.sets.map((set: any) => {
        console.log('set', set);

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
      exercises
    );
  }
}
