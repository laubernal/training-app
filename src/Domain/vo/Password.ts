import { randomBytes, scryptSync } from 'crypto';

export class Password {
  constructor(private password: string) {
    this.validate();
    this.password = this.hashPassword(this.password);
  }

  public get value(): string {
    return this.password;
  }

  private validate(): void {
    this.password = this.password.trim();

    if (this.password.length < 8) {
      throw new Error('Password length must be greater than 8');
    }
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(8).toString('hex');
    const buf = scryptSync(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`;
  }
}
