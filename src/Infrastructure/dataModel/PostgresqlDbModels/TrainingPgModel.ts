import { ExercisesPgModel } from './ExercisesPgModel';

export class TrainingPgModel {
  constructor(
    private _id: string,
    private _date: string,
    private _title: string,
    private _note: string,
    private _exercises: ExercisesPgModel[],
    private _userId: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get date(): string {
    return this._date;
  }

  public get title(): string {
    return this._title;
  }

  public get note(): string {
    return this._note;
  }

  public get exercises(): ExercisesPgModel[] {
    return this._exercises;
  }

  public get userId(): string {
    return this._userId;
  }
}
