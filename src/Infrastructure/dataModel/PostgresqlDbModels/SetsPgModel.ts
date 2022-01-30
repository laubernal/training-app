export class SetsPgModel {
  constructor(
    private _id: string,
    private _setCount: number,
    private _reps: number,
    private _weight: number
  ) {}

  public get id(): string {
    return this._id;
  }

  public get setCount(): number {
    return this._setCount;
  }

  public get reps(): number {
    return this._reps;
  }

  public get weight(): number {
    return this._weight;
  }
}
