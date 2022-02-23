import { Category } from '../../entities/Category';
import { IPostgreRepository } from './IPostgreRepository';

export interface ICategoryPgRepository extends IPostgreRepository<Category> {
  save(category: Category): Promise<void>;
  findAll(): Promise<any>;
}
