import { ExercisePgModel } from './ExercisePgModel';

export class TrainingPgModel {
  public id!: string;
  public date!: string;
  public title!: string;
  //   public note!: string;
  public exercises!: ExercisePgModel[];
  //   public userId!: string;
}
