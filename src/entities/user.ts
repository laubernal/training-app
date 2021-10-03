import { Id } from "../vo/Id";

export class User {
  public static build(firstName: string, lastName: string, email: string, password: string): User {
    return new User(Id.generate(), firstName, lastName, email, password);
  }

  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _password: string // private _passwordConfirmation: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
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
