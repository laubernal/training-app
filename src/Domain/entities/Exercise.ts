import { Serie } from './Serie';

export class Exercise {
  constructor(private _exerciseName: string, private _series: Serie[]) {}

  public get exerciseName(): string {
    return this._exerciseName;
  }

  public get series(): Serie[] {
    return this._series;
  }
}
