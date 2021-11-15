import { Training } from '../../Domain/entities/Training';
import { IFsRepository } from './IFsRepository';

export interface ITrainingRepository extends IFsRepository<Training> {}
