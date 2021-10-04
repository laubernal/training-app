import * as fs from 'fs';
import path from 'path';

import { DATA_DIR } from '../constants';
import { IReader } from '../interfaces/IReader';
import { IMapper } from '../mappers/IMapper';

export abstract class FsRepository<T, K> {
  protected abstract mapper: IMapper<T, K>;

  constructor(private reader: IReader<T>) {}

  public create(item: K): void {
    const newItem = this.mapper.toData(item);

    this.reader.data.push(newItem);
    this.save();
  }

  public save(): void {
    fs.writeFileSync(path.join(DATA_DIR, this.reader.filename), JSON.stringify(this.reader.data, null, 2));
  }

  public getOne() {}

  public getOneBy() {}

  public getAllBy() {}

  public update() {}
}
