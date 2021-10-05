import * as fs from 'fs';
import path from 'path';

import { DATA_DIR } from '../constants';
import { IReader } from '../interfaces/IReader';
import { IMapper } from '../mappers/IMapper';

type ObjectDefinition = { [key: string]: string };

export abstract class FsRepository<T, K extends ObjectDefinition> {
  protected abstract mapper: IMapper<T, K>;

  constructor(private reader: IReader<T>) {}

  public create(item: K): void {
    const newItem = this.mapper.toData(item);

    this.reader.data.push(newItem);
    this.save();
  }

  public save(): void {
    fs.writeFileSync(
      path.join(DATA_DIR, this.reader.filename),
      JSON.stringify(this.reader.data, null, 2)
    );
  }

  public getOneBy(propName: keyof K, value: string): K {
    const item = this.reader.data.find((item: T) => {
      const domainItem = this.mapper.toDomain(item);
      return domainItem[propName] === value;
    });

    if (!item) {
      throw new Error('Item not found');
    }

    return this.mapper.toDomain(item);
  }

  public getAllBy(propName: keyof K, value: string): K[] {
    const items = this.reader.data.filter((item: T) => {
      const domainItem = this.mapper.toDomain(item);
      return domainItem[propName] === value;
    });

    if (!items) {
      throw new Error('Items not found');
    }

    return items.map((item: T) => {
      return this.mapper.toDomain(item);
    });
  }

  public update() {}
}
