import { QueryResult } from 'pg';
import { CATEGORY_TABLENAME } from '../../../constants';
import { Category } from '../../../Domain/entities/Category';
import { queryResultCategory } from '../../../types';
import { CategoryPgModel } from '../../dataModel/PostgresqlDbModels/CategoryPgModel';
import { CategoryPgMapper } from '../../mappers/PostgresqlDbMappers/CategoryPgMapper';
import { Database } from './Database';
import { PostgreRepository } from './PostgreRepository';

export class CategoryPgRepository extends PostgreRepository<CategoryPgModel, Category> {
  protected mapper = new CategoryPgMapper();

  constructor() {
    super(CATEGORY_TABLENAME);
  }

  public async save(category: Category): Promise<void> {
    try {
      await Database.query(`INSERT INTO category (cat_id, cat_name) VALUES ($1, $2)`, [
        category.id,
        category.categoryName,
      ]);
    } catch (error: any) {
      throw new Error(`TrainingPgRepository - Save category error ${error.message}`);
    }
  }

  public async findAll(): Promise<Category[] | undefined> {
    try {
      const queryResult: QueryResult<queryResultCategory> = await Database.query(
        `SELECT * FROM ${CATEGORY_TABLENAME}`,
        []
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const categoriesModel = this.mapper.rawDataToModel(queryResult.rows);

      const categories = categoriesModel.map(category => {
        return this.mapper.toDomain(category);
      });

      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
