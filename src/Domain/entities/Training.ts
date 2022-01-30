import { Exercise } from './Exercise';
import { Id } from '../vo/Id';
import { TrainingDate } from '../vo/TrainingDate';

export class Training {
  public static build(date: string, title: string, note: string, exercises: Exercise[]): Training {
    return new Training(Id.generate(), TrainingDate.generate(date), title, note, exercises);
  }

  constructor(
    private _id: string,
    private _date: string,
    private _title: string,
    private _note: string,
    private _exercises: Exercise[]
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

  public get exercises(): Exercise[] {
    return this._exercises;
  }
}
