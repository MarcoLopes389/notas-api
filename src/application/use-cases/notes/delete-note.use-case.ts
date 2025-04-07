import { Injectable } from '@nestjs/common';
import { NoteShareRepository } from 'src/infrastructure/persistence/typeorm/repositories/note-share.repository';
import { NoteRepository } from 'src/infrastructure/persistence/typeorm/repositories/note.repository';

@Injectable()
export class DeleteNoteUseCase {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly noteShareRepository: NoteShareRepository,
  ) {}

  async execute(noteId: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new Error('Nota não encontrada');
    }

    if (note.getOwner().getId() !== userId) {
      throw new Error('Você não tem permissão para deletar esta nota');
    }

    const noteShares = await this.noteShareRepository.findByNoteId(noteId);

    for (const share of noteShares) {
      await this.noteShareRepository.delete(share.id);
    }

    await this.noteRepository.delete(noteId);
  }
}
