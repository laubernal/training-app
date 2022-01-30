export class Set {
  constructor(private _reps: number, private _weight: number, private _setsCount: number) {}

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
