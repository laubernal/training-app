import { QueryResult } from 'pg';

import { TRAINING_TABLENAME } from '../../../constants';
import { Training } from '../../../Domain/entities/Training';
import { Id } from '../../../Domain/vo/Id';
import { queryResultExercise, queryResultTraining } from '../../../types';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { TrainingsPgMapper } from '../../mappers/PostgresqlDbMappers/TrainingsPgMapper';
import { Database } from './Database';
import { PostgreRepository } from './PostgreRepository';

export class TrainingPgRepository extends PostgreRepository<TrainingPgModel, Training> {
  protected mapper = new TrainingsPgMapper();

  constructor() {
    super(TRAINING_TABLENAME);
  }

  public async save(training: Training): Promise<void> {
    try {
      const newTraining = this.mapper.toData(training);

      const exercisesId: string[] = [];

      for (const exercise of newTraining.exercises) {
        const exerciseFound = await this.findExercise(exercise.exerciseName);
        let exerciseId = '';

        if (!exerciseFound) {
          await this.saveExercise(exercise.id, exercise.exerciseName, exercise.category.id);
          exerciseId = exercise.id;
        } else {
          exerciseId = exerciseFound.ex_id;
        }

        for (const set of exercise.sets) {
          await this.saveSet(set.id, set.setCount, set.reps, set.weight, exerciseId);
        }

        exercisesId.push(exerciseId);
      }

      await this.saveTraining(
        newTraining.id,
        newTraining.date,
        newTraining.note,
        newTraining.userId,
        newTraining.title
      );

      for (const exerciseId of exercisesId) {
        await this.saveTrainingExerciseRelation(Id.generate(), newTraining.id, exerciseId);
      }
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Save error ${error.message}`);
    }
  }

  private async findExercise(value: string): Promise<queryResultExercise | undefined> {
    try {
      const found = await Database.query(
        `SELECT ex_id, ex_name, fk_cat_id FROM exercise WHERE ex_name LIKE $1`,
        [value]
      );

      if (found.rows.length === 0) {
        return undefined;
      }

      return found.rows[0];
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Find exercise error ${error.message}`);
    }
  }

  private async saveTrainingExerciseRelation(
    trainingExerciseId: string,
    trainingId: string,
    exerciseId: string
  ): Promise<void> {
    try {
      await Database.query(
        `INSERT INTO training_exercise (tr_ex_id, training_id, exercise_id) VALUES ($1, $2, $3)`,
        [trainingExerciseId, trainingId, exerciseId]
      );
    } catch (error: any) {
      throw new Error(
        `TrainingPgRepository - Save training exercise relation error ${error.message}`
      );
    }
  }

  private async saveTraining(
    trainingId: string,
    trainingDate: string,
    trainingNote: string,
    userId: string,
    trainingTitle: string
  ): Promise<void> {
    try {
      await Database.query(
        `INSERT INTO ${TRAINING_TABLENAME} (tr_id, tr_date, tr_note, fk_us_id, tr_title) VALUES ($1, $2, $3, $4, $5)`,
        [trainingId, trainingDate, trainingNote, userId, trainingTitle]
      );
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Save training error ${error.message}`);
    }
  }

  private async saveExercise(
    exerciseId: string,
    exerciseName: string,
    categoryId: string
  ): Promise<void> {
    try {
      await Database.query(`INSERT INTO exercise (ex_id, ex_name, fk_cat_id) VALUES ($1, $2, $3)`, [
        exerciseId,
        exerciseName,
        categoryId,
      ]);
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Save exercise error ${error.message}`);
    }
  }

  private async saveSet(
    setId: string,
    setCount: number,
    setReps: number,
    setWeight: number,
    exerciseId: string
  ): Promise<void> {
    try {
      await Database.query(
        `INSERT INTO exercise_set (set_id, set_count, set_reps, set_weight, fk_ex_id) VALUES ($1, $2, $3, $4, $5)`,
        [setId, setCount, setReps, setWeight, exerciseId]
      );
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Save set error ${error.message}`);
    }
  }

  public async getOneTrainingBy(column: string, value: string): Promise<Training | undefined> {
    try {
      const queryResult: QueryResult<queryResultTraining> = await Database.query(
        `SELECT * FROM ${TRAINING_TABLENAME} 
        INNER JOIN training_exercise ON training.tr_id = training_exercise.training_id 
        INNER JOIN exercise ON training_exercise.exercise_id = exercise.ex_id
        INNER JOIN exercise_set ON exercise.ex_id = exercise_set.fk_ex_id 
        INNER JOIN category ON category.cat_id = exercise.fk_cat_id 
        WHERE ${column} = $1 
        ORDER BY exercise_id ASC, set_count ASC `,
        [value]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const trainingModel = this.mapper.rawDataToModel(queryResult.rows);

      const training = this.mapper.toDomain(trainingModel[0]);

      return training;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAllTrainings(): Promise<Training[] | undefined> {
    try {
      const queryResult: QueryResult<queryResultTraining> = await Database.query(
        `
        SELECT * FROM ${TRAINING_TABLENAME} 
        INNER JOIN training_exercise ON training.tr_id = training_exercise.training_id 
        INNER JOIN exercise ON training_exercise.exercise_id = exercise.ex_id
        INNER JOIN exercise_set ON exercise.ex_id = exercise_set.fk_ex_id 
        INNER JOIN category ON category.cat_id = exercise.fk_cat_id 
        ORDER BY exercise_id ASC, set_count ASC`,
        []
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const trainingsModel = this.mapper.rawDataToModel(queryResult.rows);

      const trainings = trainingsModel.map(trainingModel => {
        return this.mapper.toDomain(trainingModel);
      });

      return trainings;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
