//   save
//   INSERT INTO table (column1, column2, ...) VALUES ('value1', 'value2', ...);
//   getOneBy(column: string, value: string)
//   SELECT * FROM table WHERE column=value;
//   getAllBy(column: string, value: string)
//   SELECT * FROM table WHERE column=value;
//   delete(column: string, value: string)
//   DELETE FROM table WHERE column=value;
//   update(columnID: string, idValue: string, column1: string, value1: string, column2: string)
//   UPDATE table SET column1=value1, column2=value2, ... WHERE columnID=idValue;

import { Database } from './Database';

export class PostgreRepository {
  constructor(private tableName: string) {}

  public async save(column: string, values: string[]): Promise<void> {
    try {
      const dollarValues = values
        .map((_, index: number) => {
          return `$${index + 1}`;
        })
        .join(', ');

      await Database.query(`INSERT INTO ${this.tableName} (${column}) VALUES (${dollarValues})`, [
        ...values,
      ]);

      console.log('Saved successfully');
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }

  public async getOneBy(selectList: string[], column: string, value: string): Promise<void> {
    try {
      const res = await Database.query(
        `SELECT ${selectList.toString()} FROM ${this.tableName} WHERE ${column} = $1`,
        [value]
      );
      console.log(`user name: ${res.rows[0].us_first_name} ${res.rows[0].us_last_name}`);
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }

  public async getAllBy(column: string, value: string) {
    try {
      const res = await Database.query(`SELECT * FROM ${this.tableName} WHERE ${column}=$1`, [
        value,
      ]);

      console.log(res.rows[0]);
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }

  public async delete(column: string, value: string) {
    try {
      await Database.query(`DELETE FROM ${this.tableName} WHERE ${column}=$1`, [value]);
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }

  public async update(
    column: string[],
    values: string[],
    columnId: string,
    id: string
  ): Promise<void> {
    try {
      const dollarValues = values
        .map((_, index: number) => {
          return `${column[index]}=$${index + 1}`;
        })
        .join(', ');

      const res = await Database.query(
        `UPDATE ${this.tableName} SET ${dollarValues} WHERE ${columnId}=${id}`,
        [...values]
      );

      console.log(res.rows[0]);
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }
}
