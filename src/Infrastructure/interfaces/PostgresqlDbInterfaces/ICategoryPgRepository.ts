import { Category } from '../../../Domain/entities/Category';
import { IPostgreRepository } from './IPostgreRepository';

export interface ICategoryPgRepository extends IPostgreRepository<Category> {
  findAll(): Promise<any>;
}
