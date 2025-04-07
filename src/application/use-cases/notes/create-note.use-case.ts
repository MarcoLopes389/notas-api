import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from 'src/application/dtos/notes/create-note.dto';
import { Note } from 'src/domain/notes/entities/note.entity';
import { NoteRepository } from 'src/infrastructure/persistence/typeorm/repositories/note.repository';
import { UserRepository } from 'src/infrastructure/persistence/typeorm/repositories/user.repository';

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createNoteDto: CreateNoteDto, ownerId: string): Promise<Note> {
    const owner = await this.userRepository.findById(ownerId);

    if (!owner) {
      throw new Error('Usuário não encontrado');
    }

    const note = new Note(createNoteDto.title, createNoteDto.content, owner);

    return this.noteRepository.save(note);
  }
}
