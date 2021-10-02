export class User {
  constructor(
    private _id: number,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _password: string
  ) // private _passwordConfirmation: string
  {}

  public get id(): number {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName
  }
  
  public get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  // public get passwordConfirmation(): string {
  //   return this._passwordConfirmation;
  // }
}
