import { Exercise } from './Exercise';
import { Id } from '../vo/Id';

export class Training {
  public static build(date: string, exercises: Exercise[]): Training {
    const newDate = date.split('/');
    return new Training(
      Id.generate(),
      new Date(parseInt(newDate[2]), parseInt(newDate[1]) - 1, parseInt(newDate[0])),
      exercises
    );
  }

  constructor(private _id: string, private _date: Date, private _exercises: Exercise[]) {}

  public get id(): string {
    return this._id;
  }

  public get date(): Date {
    return this._date;
  }

  public get exercises(): Exercise[] {
    return this._exercises;
  }

  private createDate(date: string) {
    const newDate = date.split('/');

    return new Date(parseInt(newDate[2]), parseInt(newDate[1]), parseInt(newDate[0])).toString();
  }
}
