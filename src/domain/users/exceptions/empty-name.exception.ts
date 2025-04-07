export class EmptyNameException extends Error {
  constructor() {
    super('Nome não pode ser vazio');
    this.name = 'EmptyNameException';
  }
}
