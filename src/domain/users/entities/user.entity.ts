import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { EmptyNameException } from '../exceptions/empty-name.exception';

export class User {
  private id: string;
  private name: string;
  private email: Email;
  private password: Password;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.validateName(name);
    this.id = id;
    this.name = name;
    this.email = new Email(email);
    this.password = new Password(password);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
  }

  updateEmail(newEmail: string): void {
    this.email = new Email(newEmail);
  }

  updatePassword(newPassword: string): void {
    this.password = new Password(newPassword);
  }

  private validateName(name: string): void {
    if (!name || name.trim() === '') {
      throw new EmptyNameException();
    }
  }
}
