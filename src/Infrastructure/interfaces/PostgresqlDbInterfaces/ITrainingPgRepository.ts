import { Training } from '../../../Domain/entities/Training';
import { IPostgreRepository } from './IPostgreRepository';

export interface ITrainingPgRepository extends IPostgreRepository<Training> {
  getOneTrainingBy(column: string, value: string): Promise<Training | undefined>;
  getAllTrainings(): Promise<Training[] | undefined>;
}
