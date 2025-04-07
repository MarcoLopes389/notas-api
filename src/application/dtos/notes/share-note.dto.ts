import { Permission } from '../../../domain/notes/enums/permission.enum';

export class ShareNoteDto {
  sharedWithUserId: string;
  permission: Permission;
}
