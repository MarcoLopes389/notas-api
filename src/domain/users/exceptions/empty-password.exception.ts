export class EmptyPasswordException extends Error {
  constructor() {
    super('Senha não pode ser vazia');
    this.name = 'EmptyPasswordException';
  }
}
