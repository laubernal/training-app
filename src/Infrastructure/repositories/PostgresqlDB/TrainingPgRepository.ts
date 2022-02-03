import { QueryResult } from 'pg';
import { Exercise } from '../../../Domain/entities/Exercise';
import { Set } from '../../../Domain/entities/Set';
import { Training } from '../../../Domain/entities/Training';
import { queryResultTraining } from '../../../types';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { TrainingsPgMapper } from '../../mappers/PostgresqlDbMappers/TrainingsPgMapper';
import { Database } from './Database';
import { PostgreRepository } from './PostgreRepository';

const tableName = 'training';

export class TrainingPgRepository extends PostgreRepository<TrainingPgModel, Training> {
  protected mapper = new TrainingsPgMapper();

  constructor() {
    super(tableName);
  }

  // SAVE STEPS
  //   1. Check if the training already exists
  // 	1.2. If it does exist, throw new error  - Training already exists

  // 2. Loop the exercises[] and keep the exercises id (to do step 4)
  // 	2.1. Check if the category already exists [CHANGE HOW THE ID OF THE CATEGROY IS GENERATED IN THE ENTITY]
  // 		2.1.1. If it does not exist, save the category
  // 	2.2. Check if the exercise already exists [CHANGE HOW THE ID OF THE CATEGROY IS GENERATED IN THE ENTITY]
  // 		2.2.1. If it does not exist, save the exercise
  // 	2.3. Loop the sets[]
  // 		2.3.1. Save each set

  // 3. Save the training

  // 4. Save relation of the training with the exercises id from step 2

  public async save(training: Training): Promise<void> {
    try {
      // Map to TrainingPgModel
      const newTraining = this.mapper.toData(training);
      console.log('new training: ', newTraining);

      // Check if training already exists -- Use getOneTrainingBy('tr_id', training.id)
      // If training does exists, return
      const trainingExists = await this.trainingExists(training.id);

      if (trainingExists) {
        throw new Error('Training already exists');
      }
      console.log('training does not exist');

      // Loop the exercises array
      // If training does not exist, check if category already exists, if not insert it
      // SELECT * FROM category WHERE cat_id = category.id

      // newTraining.exercises.map(exercise => {
      const categories = newTraining.exercises.map(exercise => {
        return exercise.category;
      });
      console.log('categories: ', categories);

      for (const category of categories) {
        const categoryExists = await this.checkIfExists('category', 'cat_id', category.id);
        console.log('category exists: ', categoryExists);

        if (!categoryExists) {
          // If does not exist: INSERT INTO category (cat_id, cat_name) VALUES [...]
          await this.saveCategory(category.id, category.categoryName);
        }
      }
      // Return category id (both cases)

      // Check if exercise already exists, if not insert it (loop to insert all exercises that does not exist)
      // SELECT * FROM exercise WHERE ex_id = exercise.id
      const exerciseExists = await this.checkIfExists('exercise', 'ex_id', '');
      if (!exerciseExists) {
        // If does not exist: INSERT INTO exercise (ex_id, ex_name, fk_cat_id) VALUES [...]
      }
      // Return exercise id (both cases)

      // Loop the sets array
      // Insert all the sets
      // INSERT INTO exercise_set ( set_id, set_count, set_reps, set_weight, fk_ex_id) VALUES [...]

      // Insert training [For now the fk_us_id will be hardcoded]
      // INSERT INTO ${tablename} (tr_id, tr_date, tr_note, fk_us_id, tr_title) VALUES [...]
      // Return training id

      // Insert relation between training & exercise
      // INSERT INTO training_exercise (tr_ex_id, training_id, exercise_id) VALUES [...]
      // Create a unique id for the tr_ex_id

      // console.log('training: ', training);
      // const exercises = training.exercises.map((exercise: Exercise) => {
      //   const sets = exercise.sets.map((set: Set) => {
      //     console.log('set:', set);
      //   });
      //   console.log('exercise: ', exercise);
      // });
      // });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkIfExists(table: string, column: string, value: string): Promise<boolean> {
    try {
      const exists = await Database.query(`SELECT * FROM ${table} WHERE ${column}='$1'`, [value]);

      if (exists) {
        return true;
      }

      return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async trainingExists(trainingId: string): Promise<boolean> {
    try {
      const trainingExists = await this.getOneTrainingBy('tr_id', trainingId);

      if (trainingExists) {
        return true;
      }

      return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async saveCategory(categoryId: string, categoryName: string): Promise<void> {
    try {
      const queryResult = await Database.query(
        `INSERT INTO category (cat_id, cat_name) VALUES $1, $2`,
        [categoryId, categoryName]
      );

      console.log('query result save category: ', queryResult.rows[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getOneTrainingBy(column: string, value: string): Promise<Training | undefined> {
    try {
      const queryResult: QueryResult<queryResultTraining> = await Database.query(
        `SELECT * FROM ${tableName} 
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
        SELECT * FROM ${tableName} 
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
