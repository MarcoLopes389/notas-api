import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteShareEntity } from '../entities/note-share.entity';
import { NoteShare } from '../../../domain/notes/value-objects/note-share.value-object';

@Injectable()
export class NoteShareRepository {
  constructor(
    @InjectRepository(NoteShareEntity)
    private readonly repository: Repository<NoteShareEntity>,
  ) {}

  async findById(id: string): Promise<NoteShare | null> {
    const noteShareEntity = await this.repository.findOne({
      where: { id },
      relations: ['note', 'sharedWithUser'],
    });
    if (!noteShareEntity) return null;
    return noteShareEntity.toDomain();
  }

  async findByNoteId(noteId: string) {
    const noteShareEntities = await this.repository.find({
      where: { noteId },
      relations: ['note', 'sharedWithUser'],
    });

    return noteShareEntities.map((noteShareEntity) =>
      noteShareEntity.toDomain(),
    );
  }

  async findByNoteIdAndUserId(
    noteId: string,
    userId: string,
  ): Promise<NoteShare> {
    const noteShareEntity = await this.repository.findOne({
      where: { noteId, sharedWithUserId: userId },
      relations: ['note', 'sharedWithUser'],
    });

    return noteShareEntity.toDomain();
  }

  async findBySharedWithUserId(userId: string): Promise<NoteShare[]> {
    const noteShareEntities = await this.repository.find({
      where: { sharedWithUserId: userId },
      relations: ['note', 'sharedWithUser'],
    });
    return noteShareEntities.map((entity) => entity.toDomain());
  }

  async save(noteShare: NoteShare): Promise<NoteShare> {
    const noteShareEntity = NoteShareEntity.fromDomain(noteShare);
    const savedEntity = await this.repository.save(noteShareEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
