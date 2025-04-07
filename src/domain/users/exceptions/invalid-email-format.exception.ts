export class InvalidEmailFormatException extends Error {
  constructor() {
    super('Email inválido');
    this.name = 'InvalidEmailFormatException';
  }
}
