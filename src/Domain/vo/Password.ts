export class Password {
  constructor(private password: string) {}

  public validate(): string {
    let passwordValidation = this.password.trim();

    if (passwordValidation.length < 8) {
      throw new Error('Password length must be greater than 8');
    }
    return passwordValidation;
  }
}
