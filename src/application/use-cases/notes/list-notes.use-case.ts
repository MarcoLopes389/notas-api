import { Injectable } from '@nestjs/common';
import { Note } from 'src/domain/notes/entities/note.entity';
import { NoteRepository } from 'src/infrastructure/persistence/repositories/note.repository';

@Injectable()
export class ListNotesUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(userId: string): Promise<Note[]> {
    const userNotes = await this.noteRepository.findByOwnerId(userId);

    return userNotes;
  }
}
