import { Training } from '../entities/Training';
import { IFsRepository } from './IFsRepository';

export interface ITrainingRepository extends IFsRepository<Training> {}
