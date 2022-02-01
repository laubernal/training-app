import { Id } from '../vo/Id';
import { Category } from './Category';
import { Set } from './Set';

export class Exercise {
  public static build(category: Category, exerciseName: string, sets: Set[]): Exercise {
    return new Exercise(Id.generate(), category, exerciseName, sets);
  }

  constructor(
    private _id: string,
    private _category: Category,
    private _exerciseName: string,
    private _sets: Set[]
  ) {}

  public get id(): string {
    return this._id;
  }

  public get category(): Category {
    return this._category;
  }

  public get exerciseName(): string {
    return this._exerciseName;
  }

  public get sets(): Set[] {
    return this._sets;
  }
}
