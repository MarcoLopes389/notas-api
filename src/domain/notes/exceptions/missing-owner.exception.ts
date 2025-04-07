export class MissingOwnerException extends Error {
  constructor() {
    super('Proprietário da nota não pode ser nulo');
    this.name = 'MissingOwnerException';
  }
}
