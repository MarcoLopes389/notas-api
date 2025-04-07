import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { NotesController } from './controllers/notes/notes.controller';
import { UsersController } from './controllers/users/users.controller';
import { NotesGateway } from './gateways/notes.gateway';

@Module({
  imports: [ApplicationModule],
  controllers: [NotesController, UsersController],
  providers: [NotesGateway],
})
export class PresentationModule {}
