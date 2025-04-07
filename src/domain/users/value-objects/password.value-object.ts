import { EmptyPasswordException } from '../exceptions/empty-password.exception';
import { PasswordTooShortException } from '../exceptions/password-too-short.exception';
import { PasswordMissingUpperCaseException } from '../exceptions/password-missing-uppercase.exception';
import { PasswordMissingLowerCaseException } from '../exceptions/password-missing-lowercase.exception';
import { PasswordMissingNumberException } from '../exceptions/password-missing-number.exception';
import { PasswordMissingSpecialCharException } from '../exceptions/password-missing-special-char.exception';

export class Password {
  private readonly value: string;

  constructor(password: string) {
    this.value = password;
    this.validate();
  }

  private validate(): void {
    if (!this.value) {
      throw new EmptyPasswordException();
    }

    if (this.value.length < 8) {
      throw new PasswordTooShortException();
    }

    const hasUpperCase = /[A-Z]/.test(this.value);
    const hasLowerCase = /[a-z]/.test(this.value);
    const hasNumbers = /\d/.test(this.value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(this.value);

    if (!hasUpperCase) {
      throw new PasswordMissingUpperCaseException();
    }

    if (!hasLowerCase) {
      throw new PasswordMissingLowerCaseException();
    }

    if (!hasNumbers) {
      throw new PasswordMissingNumberException();
    }

    if (!hasSpecialChars) {
      throw new PasswordMissingSpecialCharException();
    }
  }

  getValue(): string {
    return this.value;
  }
}
