export class PasswordMissingLowerCaseException extends Error {
  constructor() {
    super('Senha deve conter pelo menos uma letra minúscula');
    this.name = 'PasswordMissingLowerCaseException';
  }
}
