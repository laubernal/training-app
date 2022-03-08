import { ObjectDefinition } from '../../../types';
import { IMapper } from '../../mappers/IMapper';
import { Database } from './Database';

export abstract class PostgreRepository<T, K extends ObjectDefinition> {
  protected abstract mapper: IMapper<T, K>;

  constructor(private tableName: string) {}

  public async save(item: K): Promise<void> {
    try {
      const newItem = this.mapper.toData(item);
      console.log('new item', newItem);

      const columns = Object.keys(newItem);

      const values = Object.values(newItem);

      const preparedStatements = values
        .map((_: any, index: number) => {
          return `$${index + 1}`;
        })
        .join(', ');

      await Database.query(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${preparedStatements})`,
        [...values]
      );

      console.log('Saved successfully');
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getOneBy(column: string, value: string): Promise<K | undefined> {
    try {
      const queryResult = await Database.query(
        `SELECT * FROM ${this.tableName} WHERE ${column} = $1`,
        [value]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const resultModel = this.mapper.rawDataToModel(queryResult.rows[0]);

      return this.mapper.toDomain(resultModel[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getAllBy(column: string, value: string): Promise<K | undefined> {
    try {
      const queryResult = await Database.query(
        `SELECT * FROM ${this.tableName} WHERE ${column}=$1`,
        [value]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      console.log(queryResult.rows[0]);
      return this.mapper.toDomain(queryResult.rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async delete(column: string, value: string): Promise<void> {
    try {
      await Database.query(`DELETE FROM ${this.tableName} WHERE ${column}=$1`, [value]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async update(
    column: string[],
    values: string[],
    columnId: string,
    id: string
  ): Promise<K | undefined> {
    try {
      const preparedStatements = values
        .map((_: any, index: number) => {
          return `${column[index]}=$${index + 1}`;
        })
        .join(', ');

      const queryResult = await Database.query(
        `UPDATE ${this.tableName} SET ${preparedStatements} WHERE ${columnId}='${id}' RETURNING *`,
        [...values]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const resultModel = this.mapper.rawDataToModel(queryResult.rows);

      const resultDomain = this.mapper.toDomain(resultModel[0]);

      console.log('Updated successfully');

      return resultDomain;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
