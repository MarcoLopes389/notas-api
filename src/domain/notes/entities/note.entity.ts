import { User } from '../../users/entities/user.entity';
import { EmptyTitleException } from '../exceptions/empty-title.exception';
import { EmptyContentException } from '../exceptions/empty-content.exception';
import { MissingOwnerException } from '../exceptions/missing-owner.exception';

export class Note {
  private id: string;
  private title: string;
  private content: string;
  private owner: User;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    title: string,
    content: string,
    owner: User,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.validateTitle(title);
    this.validateContent(content);
    this.validateOwner(owner);

    this.id = id;
    this.title = title;
    this.content = content;
    this.owner = owner;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getOwner(): User {
    return this.owner;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateTitle(newTitle: string): void {
    this.validateTitle(newTitle);
    this.title = newTitle;
  }

  updateContent(newContent: string): void {
    this.validateContent(newContent);
    this.content = newContent;
  }

  updateOwner(newOwner: User): void {
    this.validateOwner(newOwner);
    this.owner = newOwner;
  }

  private validateTitle(title: string): void {
    if (!title || title.trim() === '') {
      throw new EmptyTitleException();
    }
  }

  private validateContent(content: string): void {
    if (!content || content.trim() === '') {
      throw new EmptyContentException();
    }
  }

  private validateOwner(owner: User): void {
    if (!owner) {
      throw new MissingOwnerException();
    }
  }
}
