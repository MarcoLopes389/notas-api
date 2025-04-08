import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from '../../infrastructure/auth/guards/ws-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateNoteDto } from 'src/application/dtos/notes/create-note.dto';
import { UpdateNoteDto } from 'src/application/dtos/notes/update-note.dto';
import { CreateNoteUseCase } from 'src/application/use-cases/notes/create-note.use-case';
import { DeleteNoteUseCase } from 'src/application/use-cases/notes/delete-note.use-case';
import { ListNotesUseCase } from 'src/application/use-cases/notes/list-notes.use-case';
import { UpdateNoteUseCase } from 'src/application/use-cases/notes/update-note.use-case';
import { UserRef } from 'src/infrastructure/auth/decorators/user.decorator';

@WebSocketGateway()
@UseGuards(WsJwtAuthGuard)
export class NotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly listNotesUseCase: ListNotesUseCase,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createNote')
  async handleCreateNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() createNoteDto: CreateNoteDto,
    @UserRef('id') userId: string,
  ) {
    try {
      if (!userId) {
        client.emit('errorNoteCreate', { message: 'Usuário não autenticado' });
        return;
      }

      const note = await this.createNoteUseCase.execute(createNoteDto, userId);

      client.broadcast.emit('noteCreated', note);
    } catch (error) {
      client.emit('errorNoteCreate', { message: error.message });
    }
  }

  @SubscribeMessage('updateNote')
  async handleUpdateNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: string; data: UpdateNoteDto },
    @UserRef('id') userId: string,
  ) {
    try {
      if (!userId) {
        client.emit('errorNoteUpdate', { message: 'Usuário não autenticado' });
        return;
      }

      const note = await this.updateNoteUseCase.execute(
        data.id,
        userId,
        data.data,
      );

      client.broadcast.emit('noteUpdated', note);
    } catch (error) {
      client.emit('errorNoteUpdate', { message: error.message });
    }
  }

  @SubscribeMessage('deleteNote')
  async handleDeleteNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() noteId: string,
    @UserRef('id') userId: string,
  ) {
    try {
      if (!userId) {
        client.emit('errorNoteDelete', { message: 'Usuário não autenticado' });
        return;
      }

      await this.deleteNoteUseCase.execute(noteId, userId);
      client.broadcast.emit('noteDeleted', { id: noteId });
    } catch (error) {
      client.emit('errorNoteDelete', { message: error.message });
    }
  }

  @SubscribeMessage('getNotes')
  async handleGetNotes(
    @ConnectedSocket() client: Socket,
    @UserRef('id') userId: string,
  ) {
    try {
      if (!userId) {
        client.emit('errorNotesList', { message: 'Usuário não autenticado' });
        return;
      }

      const notes = await this.listNotesUseCase.execute(userId);
      client.emit('notesList', notes);
    } catch (error) {
      client.emit('errorNotesList', { message: error.message });
    }
  }
}
