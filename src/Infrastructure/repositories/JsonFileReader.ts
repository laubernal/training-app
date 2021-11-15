import * as fs from 'fs';
import path from 'path';

import { DATA_DIR } from '../../constants';
import { IReader } from '../interfaces/IReader';

export class JsonFileReader<T> implements IReader<T> {
  public data!: T[];

  constructor(private _filename: string) {
    this.read();
  }

  public read(): void {
    if (!this._filename) {
      throw new Error('A filename is needed');
    }

    try {
      fs.accessSync(path.join(DATA_DIR, this._filename));
    } catch (err) {
      fs.writeFileSync(path.join(DATA_DIR, this.filename), '[]');
    }

    this.data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, this._filename), { encoding: 'utf8' })
    );
  }

  public get filename(): string {
    return this._filename;
  }
}
