export class PasswordMissingUpperCaseException extends Error {
  constructor() {
    super('Senha deve conter pelo menos uma letra maiúscula');
    this.name = 'PasswordMissingUpperCaseException';
  }
}
