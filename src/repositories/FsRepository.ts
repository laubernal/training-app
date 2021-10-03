import { IMapper } from '../mappers/IMapper';
import { JsonFileReader } from './JsonFileReader';

export class FsRepository<T, K> extends JsonFileReader<T> {
  protected abstract mapper: IMapper<T, K>;

  public create(item: K): void {
    const newItem = this.mapper.toData(item);

    this.data.push(newItem);
    this.save();
  }

  public getOne() {}

  public getOneBy() {}

  public getAllBy() {}

  public update() {}
}
