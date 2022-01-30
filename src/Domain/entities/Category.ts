export class Category {
  constructor(private _categoryName: string) {}

  public get categoryName(): string {
    return this._categoryName;
  }
}
