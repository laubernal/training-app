//   save
//   INSERT INTO table (column1, column2, ...) VALUES ('value1', 'value2', ...);
//   write
//   getOneBy(column: string, value: string)
//   SELECT * FROM table WHERE column=value;
//   getAllBy(column: string, value: string)
//   SELECT * FROM table WHERE column=value;
//   delete(column: string, value: string)
//   DELETE FROM table WHERE column=value;
//   update(columnID: string, idValue: string, column1: string, value1: string, column2: string)
//   UPDATE table SET column1=value2, column2=value2, ... WHERE columnID=idValue;

import { Database } from './Database';

export class PostgreRepository {
  constructor(private tableName: string) {}

  public async save(column: string, value: string[]): Promise<void> {
    try {
      await Database.query(
        `INSERT INTO ${this.tableName} (${column}) VALUES ($1, $2, $3, $4, $5)`,
        value
      );

      console.log('Saved successfully');
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }

  public async getOneBy(column: string, value: string): Promise<void> {
    try {
      const res = await Database.query(
        `SELECT us_first_name, us_last_name FROM ${this.tableName} WHERE ${column} = $1`,
        [value]
      );
      console.log(`user name: ${res.rows[0].us_first_name} ${res.rows[0].us_last_name}`);
    } catch (err: any) {
      throw new Error(err.stack);
    }
  }
}
