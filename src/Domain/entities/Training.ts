import { Exercise } from './Exercise';
import { Id } from '../vo/Id';

export class Training {
  public static build(date: string, exercises: Exercise[]): Training {
    return new Training(Id.generate(), date, exercises);
  }

  constructor(private _id: string, private _date: string, private _exercises: Exercise[]) {}

  public get id(): string {
    return this._id;
  }

  public get date(): string {
    return this._date;
  }

  public get exercises(): Exercise[] {
    return this._exercises;
  }
}
