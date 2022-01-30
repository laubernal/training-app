import { CategoryPgModel } from './CategoryPgModel';
import { SetsPgModel } from './SetsPgModel';

export class ExercisesPgModel {
  constructor(
    private _id: string,
    private _exerciseName: string,
    private _sets: SetsPgModel[],
    private _category: CategoryPgModel
  ) {}

  public get id(): string {
    return this._id;
  }

  public get exerciseName(): string {
    return this._exerciseName;
  }

  public get sets(): SetsPgModel[] {
    return this._sets;
  }

  public get category(): CategoryPgModel {
    return this._category;
  }
}
