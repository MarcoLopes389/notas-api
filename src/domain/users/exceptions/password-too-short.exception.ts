export class PasswordTooShortException extends Error {
  constructor() {
    super('Senha deve ter no mínimo 8 caracteres');
    this.name = 'PasswordTooShortException';
  }
}
