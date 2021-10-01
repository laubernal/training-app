import * as fs from 'fs';
import path from 'path';

import { DATA_DIR } from '../constants';

export class JsonFileReader {
  // Create instance variable to persist the data of the JSON inside it and to be able to manipulate it
  
  constructor(private filename: string) {}

  // Method to read the JSON and parse it, and to check if it exists or not

  public save(data: string) {
    fs.writeFileSync(path.join(DATA_DIR, this.filename), data);
  }
}
