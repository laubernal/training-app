import { Training } from '../../../Domain/entities/Training';
import { IPostgreRepository } from './IPostgreRepository';

export interface ITrainingPgRepository extends IPostgreRepository<Training> {
  save(training: Training): Promise<void>;
  getOneTrainingBy(column: string, value: string): Promise<Training | undefined>;
  getAllTrainings(): Promise<Training[] | undefined>;
}
