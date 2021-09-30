export class User {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _passwordConfirmation: string
  ) {}

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public get passwordConfirmation() {
    return this._passwordConfirmation;
  }

  public build() {
    // Call create method from repository
  }
}
