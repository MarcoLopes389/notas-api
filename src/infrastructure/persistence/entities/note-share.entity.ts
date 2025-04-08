import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NoteEntity } from './note.entity';
import { Permission } from 'src/domain/notes/enums/permission.enum';
import { NoteShare } from 'src/domain/notes/value-objects/note-share.value-object';

@Entity('note_shares')
export class NoteShareEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'note_id' })
  noteId: string;

  @Column({ name: 'shared_with_user_id' })
  sharedWithUserId: string;

  @Column({
    name: 'permission',
    type: 'enum',
    enum: Permission,
    default: Permission.READ,
  })
  permission: Permission;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => NoteEntity)
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'shared_with_user_id' })
  sharedWithUser: UserEntity;

  toDomain(): NoteShare {
    return new NoteShare(
      this.noteId,
      this.sharedWithUserId,
      this.permission,
      this.id,
      this.createdAt,
    );
  }

  static fromDomain(noteShare: NoteShare): NoteShareEntity {
    const noteShareEntity = new NoteShareEntity();
    noteShareEntity.id = noteShare.id;
    noteShareEntity.noteId = noteShare.noteId;
    noteShareEntity.sharedWithUserId = noteShare.sharedWithUserId;
    noteShareEntity.permission = noteShare.permission;
    noteShareEntity.createdAt = noteShare.createdAt;
    return noteShareEntity;
  }
}
