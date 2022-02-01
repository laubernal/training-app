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

  public async save(training: Training): Promise<void> {
    try {
      // Map to TrainingPgModel
      const newTraining = this.mapper.toData(training);

      // Check if training already exists
      // Use getOneTrainingBy('tr_id', training.id)
      // If training does exists, return
      const trainingExists = await this.checkTrainingExists(training.id);

      if (trainingExists) {
        throw new Error('Training already exists');
      }

      // Loop the exercises array
      // If training does not exist, check if category already exists, if not insert it
      // SELECT * FROM category WHERE cat_id = category.id
      const categoryIds = training.exercises.map(exercise => {
        return exercise.category.id;
      });

      const categoryExists = await this.checkIfExists('category', 'cat_id', '');

      if (!categoryExists) {
        // If does not exist: INSERT INTO category (cat_id, cat_name) VALUES [...]
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

  private async checkTrainingExists(trainingId: string): Promise<boolean> {
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
