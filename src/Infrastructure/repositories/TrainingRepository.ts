import { TRAININGS_JSON } from '../../constants';
import { Training } from '../../Domain/entities/Training';
import { TrainingModel } from '../../Domain/interfaces/TrainingModel';
import { TrainingsMapper } from '../mappers/TrainingsMapper';
import { FsRepository } from './FsRepository';
import { JsonFileReader } from './JsonFileReader';

export class TrainingRepository extends FsRepository<TrainingModel, Training> {
  protected mapper = new TrainingsMapper();

  constructor() {
    super(new JsonFileReader(TRAININGS_JSON));
  }
}
