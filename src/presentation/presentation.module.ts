import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { NotesController } from './controllers/notes/notes.controller';
import { UsersController } from './controllers/users/users.controller';
import { NotesGateway } from './gateways/notes.gateway';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [NotesController, UsersController, AuthController],
  providers: [NotesGateway],
})
export class PresentationModule {}
