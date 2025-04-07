export class EmptyContentException extends Error {
  constructor() {
    super('Conteúdo não pode ser vazio');
    this.name = 'EmptyContentException';
  }
}
