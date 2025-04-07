export class PasswordMissingSpecialCharException extends Error {
  constructor() {
    super('Senha deve conter pelo menos um caractere especial');
    this.name = 'PasswordMissingSpecialCharException';
  }
}
