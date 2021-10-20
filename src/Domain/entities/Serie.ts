export class Serie {
  constructor(private _reps: number, private _weight: number, private _seriesCount: number) {}

  public get reps(): number {
    return this._reps;
  }

  public get weight(): number {
    return this._weight;
  }

  public get seriesCount(): number {
    return this._seriesCount;
  }
}
