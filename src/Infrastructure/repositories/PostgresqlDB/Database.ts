import { Pool } from 'pg';

export class Database {
  private static client: Pool;

  private constructor() {}

  public static instance(): Pool {
    // if (!this.client) {
    //   this.client = new Pool();
    // }

    this.client = new Pool();

    return this.client;
  }

  public static async query(query: string, values: any[]) {
    const pool = Database.instance();

    try {
      await pool.connect();

      return await pool.query(query, values);
    } catch (error: any) {
      throw new Error(error.stack);
    }
  }
}
