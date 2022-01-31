import { Id } from '../vo/Id';
import { Category } from './Category';
import { Set } from './Set';

export class Exercise {
  public static build(categoryName: string, exerciseName: string, sets: Set[]): Exercise {
    return new Exercise(Id.generate(), Category.build(categoryName), exerciseName, sets);
  }

  constructor(
    private _id: string,
    private _categoryName: Category,
    private _exerciseName: string,
    private _sets: Set[]
  ) {}

  public get id(): string {
    return this._id;
  }

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
