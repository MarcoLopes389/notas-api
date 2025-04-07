import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../infrastructure/persistence/typeorm/repositories/note.repository';
import { UserRepository } from '../../../infrastructure/persistence/typeorm/repositories/user.repository';
import { NoteShareRepository } from '../../../infrastructure/persistence/typeorm/repositories/note-share.repository';
import { NoteShare } from '../../../domain/notes/value-objects/note-share.value-object';
import { ShareNoteDto } from '../../dtos/notes/share-note.dto';

@Injectable()
export class ShareNoteUseCase {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository,
    private readonly noteShareRepository: NoteShareRepository,
  ) {}

  async execute(
    noteId: string,
    shareNoteDto: ShareNoteDto,
  ): Promise<NoteShare> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Nota não encontrada');
    }

    const sharedWithUser = await this.userRepository.findById(
      shareNoteDto.sharedWithUserId,
    );
    if (!sharedWithUser) {
      throw new Error('Usuário não encontrado');
    }

    const existingShare = await this.noteShareRepository.findByNoteIdAndUserId(
      noteId,
      shareNoteDto.sharedWithUserId,
    );

    if (existingShare) {
      throw new Error('Esta nota já está compartilhada com este usuário');
    }

    const noteShare = new NoteShare(
      noteId,
      shareNoteDto.sharedWithUserId,
      shareNoteDto.permission,
    );

    return this.noteShareRepository.save(noteShare);
  }
}
