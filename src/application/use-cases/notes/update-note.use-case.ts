import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from 'src/application/dtos/notes/update-note.dto';
import { Note } from 'src/domain/notes/entities/note.entity';
import { NoteRepository } from 'src/infrastructure/persistence/typeorm/repositories/note.repository';

@Injectable()
export class UpdateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(
    noteId: string,
    userId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const existingNote = await this.noteRepository.findById(noteId);
    if (!existingNote) {
      throw new Error('Nota não encontrada');
    }

    if (existingNote.getOwner().getId() !== userId) {
      throw new Error('Você não tem permissão para atualizar esta nota');
    }

    if (updateNoteDto.content) {
      existingNote.updateContent(updateNoteDto.content);
    }

    if (updateNoteDto.title) {
      existingNote.updateTitle(updateNoteDto.title);
    }

    return this.noteRepository.save(existingNote);
  }
}
