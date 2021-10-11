export class Email {
  constructor(private email: string) {
    this.validate();
  }

  public get value(): string {
    return this.email;
  }

  private validate(): void {
    this.email = this.email.trim();
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!regexp.test(this.email)) {
      throw new Error('Please enter a valid email');
    }
  }
}
