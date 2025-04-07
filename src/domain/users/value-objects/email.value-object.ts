import { EmptyEmailException } from '../exceptions/empty-email.exception';
import { InvalidEmailFormatException } from '../exceptions/invalid-email-format.exception';

export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.value = email;
    this.validate();
  }

  private validate(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.value) {
      throw new EmptyEmailException();
    }

    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailFormatException();
    }
  }

  getValue(): string {
    return this.value;
  }
}
