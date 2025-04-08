import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { CreateNoteUseCase } from './use-cases/notes/create-note.use-case';
import { DeleteNoteUseCase } from './use-cases/notes/delete-note.use-case';
import { ListNotesUseCase } from './use-cases/notes/list-notes.use-case';
import { ShareNoteUseCase } from './use-cases/notes/share-note.use-case';
import { UpdateNoteUseCase } from './use-cases/notes/update-note.use-case';
import { CreateUserUseCase } from './use-cases/users/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/users/update-user.use-case';
import { GetNoteUseCase } from './use-cases/notes/get-note.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ListNotesUseCase,
    GetNoteUseCase,
    CreateNoteUseCase,
    ShareNoteUseCase,
    DeleteNoteUseCase,
    UpdateNoteUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [
    ListNotesUseCase,
    GetNoteUseCase,
    CreateNoteUseCase,
    ShareNoteUseCase,
    DeleteNoteUseCase,
    UpdateNoteUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
  ],
})
export class ApplicationModule {}
