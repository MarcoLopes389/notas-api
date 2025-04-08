import { Injectable } from '@nestjs/common';
import { NoteRepository } from 'src/infrastructure/persistence/repositories/note.repository';

@Injectable()
export class GetNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(id: string) {
    const note = await this.noteRepository.findById(id);

    return note;
  }
}
