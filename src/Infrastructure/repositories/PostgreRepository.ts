// export class PostgreRepository {
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
// }

import { Client } from 'pg';

export class PostgreRepo {
  public async getUser(): Promise<void> {
    try {
      const res = await Database.query(
        'SELECT us_first_name, us_last_name FROM users WHERE us_id = $1',
        ['1']
      );
      console.log(`user name: ${res.rows[0].us_first_name} ${res.rows[0].us_last_name}`);
    } catch (err: any) {
      console.error(err.stack);
    }
  }
}

class Database {
  private static client: Client;
  private constructor() {}

  public static instance(): Client {
    if (!this.client) {
      this.client = new Client();
    }

    return this.client;
  }

  public static async query(query: string, values: any[]) {
    const client = Database.instance();

    try {
      await client.connect();
      return await client.query(query, values);
    } catch (error: any) {
      throw new Error();
    } finally {
      client.end();
    }
  }
}
