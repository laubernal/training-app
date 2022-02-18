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
      const categoryFound = await this.findOne(category.categoryName);

      if (categoryFound) {
        throw new Error(`The category you're trying to add already exists`);
      }

      await Database.query(`INSERT INTO ${CATEGORY_TABLENAME} (cat_id, cat_name) VALUES ($1, $2)`, [
        category.id,
        category.categoryName,
      ]);
    } catch (error: any) {
      throw new Error(`CategoryPgRepository - Save error ${error.message}`);
    }
  }

  private async findOne(categoryName: string): Promise<Category | undefined> {
    try {
      const categoryNameToCompare = '%'.concat(categoryName, '%');

      const categoryFound = await Database.query(
        `SELECT * FROM ${CATEGORY_TABLENAME} WHERE cat_name LIKE $1`,
        [categoryNameToCompare]
      );

      if (categoryFound.rows.length === 0) {
        console.log('return undefined');

        return undefined;
      }

      return categoryFound.rows[0];
    } catch (error: any) {
      throw new Error(error.message);
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
