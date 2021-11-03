import { ExercisesModel } from './ExercisesModel';

export class TrainingModel {
  public id!: string;
  public date!: string;
  public title!: string;
  public exercises!: ExercisesModel[];
}
