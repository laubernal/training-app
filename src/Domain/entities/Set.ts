import { Id } from '../vo/Id';

export class Set {
  public static build(reps: number, weight: number, setsCount: number): Set {
    return new Set(Id.generate(), reps, weight, setsCount);
  }

  constructor(
    private _id: string,
    private _reps: number,
    private _weight: number,
    private _setsCount: number
  ) {}

  public get id(): string {
    return this._id;
  }

  public get reps(): number {
    return this._reps;
  }

  public get weight(): number {
    return this._weight;
  }

  public get setsCount(): number {
    return this._setsCount;
  }
}
