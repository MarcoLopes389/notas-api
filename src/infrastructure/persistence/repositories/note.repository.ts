import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from '../entities/note.entity';
import { Note } from '../../../domain/notes/entities/note.entity';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly repository: Repository<NoteEntity>,
  ) {}

  async findById(id: string): Promise<Note | null> {
    const noteEntity = await this.repository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!noteEntity) return null;
    return noteEntity.toDomain();
  }

  async findByOwnerId(ownerId: string): Promise<Note[]> {
    const noteEntities = await this.repository.find({
      where: { ownerId },
      relations: ['owner'],
    });
    return noteEntities.map((entity) => entity.toDomain());
  }

  async save(note: Note): Promise<Note> {
    const noteEntity = NoteEntity.fromDomain(note);
    const savedEntity = await this.repository.save(noteEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
