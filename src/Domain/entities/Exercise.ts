import { Category } from './Category';
import { Set } from './Set';

export class Exercise {
  constructor(
    private _categoryName: Category,
    private _exerciseName: string,
    private _sets: Set[]
  ) {}

  public get categoryName(): Category {
    return this._categoryName;
  }

  public get exerciseName(): string {
    return this._exerciseName;
  }

  public get sets(): Set[] {
    return this._sets;
  }
}
