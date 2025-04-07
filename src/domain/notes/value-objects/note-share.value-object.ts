import { Permission } from '../enums/permission.enum';

export class NoteShare {
  id: string | null;
  noteId: string;
  sharedWithUserId: string;
  permission: Permission;
  createdAt: Date;

  constructor(
    noteId: string,
    sharedWithUserId: string,
    permission: Permission,
    id?: string,
    createdAt?: Date,
  ) {
    this.id = id || null;
    this.noteId = noteId;
    this.sharedWithUserId = sharedWithUserId;
    this.permission = permission;
    this.createdAt = createdAt || new Date();
  }
}
