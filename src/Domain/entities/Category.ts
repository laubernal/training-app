export class Category {
  constructor(private _id: string, private _categoryName: string) {}

  public get id(): string {
    return this._id;
  }
  public get categoryName(): string {
    return this._categoryName;
  }
}
