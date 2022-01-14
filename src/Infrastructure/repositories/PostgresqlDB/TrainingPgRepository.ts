import { Training } from '../../../Domain/entities/Training';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { PostgreRepository } from './PostgreRepository';

export abstract class TrainingPgRepository extends PostgreRepository<TrainingPgModel, Training> {
  constructor() {
    super('trainings');
  }
}
