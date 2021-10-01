export class User {
  constructor(
    private _id: number,
    private _name: string,
    private _email: string,
    private _password: string,
    private _passwordConfirmation: string
  ) {}

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get passwordConfirmation(): string {
    return this._passwordConfirmation;
  }

  public build() {
    // Call create method from repository
  }
}
