export class Password {
  constructor(private password: string) {
    this.validate();
  }

  public get value(): string {
    return this.password;
  }

  private validate(): string {
    this.password = this.password.trim();

    if (this.password.length < 8) {
      throw new Error('Password length must be greater than 8');
    }
    return this.password;
  }
}
