export class PasswordMissingNumberException extends Error {
  constructor() {
    super('Senha deve conter pelo menos um número');
    this.name = 'PasswordMissingNumberException';
  }
}
