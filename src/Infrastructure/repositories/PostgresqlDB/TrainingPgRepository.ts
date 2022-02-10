import { QueryResult } from 'pg';

import { TRAINING_TABLENAME } from '../../../constants';
import { Training } from '../../../Domain/entities/Training';
import { Id } from '../../../Domain/vo/Id';
import { queryResultCategory, queryResultExercise, queryResultTraining } from '../../../types';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { TrainingsPgMapper } from '../../mappers/PostgresqlDbMappers/TrainingsPgMapper';
import { Database } from './Database';
import { PostgreRepository } from './PostgreRepository';

export class TrainingPgRepository extends PostgreRepository<TrainingPgModel, Training> {
  protected mapper = new TrainingsPgMapper();

  constructor() {
    super(TRAINING_TABLENAME);
  }

  // SAVE STEPS
  //   1. Map the training to data

  // 2. Loop the exercises[] and keep the exercises id (to do step 4)

  // 	2.1. Check if the category already exists - findCategory()
  // 		2.1.1. If it does not exist, save the category and save the categoryId - saveCategory()
  //    2.1.2. If it exists, save the categoryId

  // 	2.2. Check if the exercise already exists - findExercise()
  // 		2.2.1. If it does not exist, save the exercise and save the exerciseId - saveExercise()
  //    2.2.2. If it exists, save the exerciseId

  // 	2.3. Loop the sets[]
  // 		2.3.1. Save each set - saveSet()

  //  2.4. Return the exercise id

  // 3. Save the training

  // 4. Save relation of the training with the exercises id from step 2

  public async save(training: Training): Promise<void> {
    try {
      const newTraining = this.mapper.toData(training);

      const exercisesId: string[] = [];

      for (const exercise of newTraining.exercises) {
        const categoryFound = await this.findCategory(exercise.category.categoryName);
        let categoryId = '';

        if (!categoryFound) {
          await this.saveCategory(exercise.category.id, exercise.category.categoryName);
          categoryId = exercise.category.id;
        } else {
          categoryId = categoryFound.cat_id;
        }

        const exerciseFound = await this.findExercise(exercise.exerciseName);
        let exerciseId = '';

        if (!exerciseFound) {
          await this.saveExercise(exercise.id, exercise.exerciseName, categoryId);
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
      throw new Error(error.message);
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
      throw new Error(`Find exercise error ------------------ ${error.message}`);
    }
  }

  private async findCategory(value: string): Promise<queryResultCategory | undefined> {
    try {
      const found = await Database.query(
        `SELECT cat_id, cat_name FROM category WHERE cat_name LIKE $1`,
        [value]
      );

      if (found.rows.length === 0) {
        return undefined;
      }

      return found.rows[0];
    } catch (error: any) {
      throw new Error(`Find category error ------------------ ${error.message}`);
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
        `Save training exercise relation error ----------------------- ${error.message}`
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
      throw new Error(`Save training error ------------------ ${error.message}`);
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
      throw new Error(`Save exercise error ------------------- ${error.message}`);
    }
  }

  private async saveCategory(categoryId: string, categoryName: string): Promise<void> {
    try {
      await Database.query(`INSERT INTO category (cat_id, cat_name) VALUES ($1, $2)`, [
        categoryId,
        categoryName,
      ]);
    } catch (error: any) {
      throw new Error(`Save category error ------------------ ${error.message}`);
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
      throw new Error(`Save set error ------------------ ${error.message}`);
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
