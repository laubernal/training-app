import { ExerciseName } from '../vo/ExerciseName';
import { Id } from '../vo/Id';
import { Category } from './Category';
import { Set } from './Set';

export class Exercise {
  public static build(category: Category, exerciseName: ExerciseName, sets: Set[]): Exercise {
    return new Exercise(Id.generate(), category, exerciseName, sets);
  }

  constructor(
    private _id: string,
    private _category: Category,
    private _exerciseName: ExerciseName,
    private _sets: Set[]
  ) {}

  public get id(): string {
    return this._id;
  }

  public get category(): Category {
    return this._category;
  }

  public get exerciseName(): ExerciseName {
    return this._exerciseName;
  }

  public get sets(): Set[] {
    return this._sets;
  }
}
