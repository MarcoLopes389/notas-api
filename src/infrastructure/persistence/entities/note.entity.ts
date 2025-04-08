import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Note } from 'src/domain/notes/entities/note.entity';

@Entity('notes')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toDomain(): Note {
    return new Note(
      this.title,
      this.content,
      this.owner.toDomain(),
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(note: Note): NoteEntity {
    const noteEntity = new NoteEntity();
    noteEntity.id = note.getId();
    noteEntity.title = note.getTitle();
    noteEntity.content = note.getContent();
    noteEntity.createdAt = note.getCreatedAt();
    noteEntity.updatedAt = note.getUpdatedAt();
    return noteEntity;
  }
}
