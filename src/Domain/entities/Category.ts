import { Id } from '../vo/Id';

export class Category {
  public static build(categoryName: string) {
    return new Category(Id.generate(), categoryName);
  }

  constructor(private _id: string, private _categoryName: string) {}

  public get id(): string {
    return this._id;
  }
  public get categoryName(): string {
    return this._categoryName;
  }
}
