import * as fs from 'fs';
import path from 'path';

import { DATA_DIR } from '../constants';

export class JsonFileReader<T> {
  // Create instance variable to persist the data of the JSON inside it and to be able to manipulate it
  protected data!: T[];

  constructor(private filename: string) {}

  // Method to read the JSON and parse it, and to check if it exists or not
  public read() {
    if (!this.filename) {
      throw new Error('A filename is needed');
    }

    this.data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, this.filename), { encoding: 'utf8' })
    );
  }

  public save(): void {
    fs.writeFileSync(path.join(DATA_DIR, this.filename), JSON.stringify(this.data, null, 2));
  }
}
