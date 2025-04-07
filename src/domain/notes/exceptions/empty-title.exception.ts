export class EmptyTitleException extends Error {
  constructor() {
    super('Título não pode ser vazio');
    this.name = 'EmptyTitleException';
  }
}
