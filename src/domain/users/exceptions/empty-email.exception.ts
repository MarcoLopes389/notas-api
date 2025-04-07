export class EmptyEmailException extends Error {
  constructor() {
    super('Email não pode ser vazio');
    this.name = 'EmptyEmailException';
  }
}
