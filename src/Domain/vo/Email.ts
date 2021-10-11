export class Email {
  constructor(private email: string) {}

  public validate(): string {
    const emailValidation = this.email.trim();
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!regexp.test(emailValidation)) {
      throw new Error('Please enter a valid email');
    }

    return emailValidation;
  }
}
