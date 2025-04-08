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

@WebSocketGateway()
@UseGuards(WsJwtAuthGuard)
export class NotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, string> = new Map();

  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly listNotesUseCase: ListNotesUseCase,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    if (client.data.user) {
      this.connectedClients.set(client.id, client.data?.user?.id);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('createNote')
  async handleCreateNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() createNoteDto: CreateNoteDto,
  ) {
    try {
      const userId = this.connectedClients.get(client.id);
      if (!userId) {
        client.emit('error', { message: 'Usuário não autenticado' });
        return;
      }

      const note = await this.createNoteUseCase.execute(createNoteDto, userId);

      client.emit('noteCreated', note);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('updateNote')
  async handleUpdateNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { id: string; data: UpdateNoteDto },
  ) {
    try {
      const userId = this.connectedClients.get(client.id);
      if (!userId) {
        client.emit('error', { message: 'Usuário não autenticado' });
        return;
      }

      const note = await this.updateNoteUseCase.execute(
        data.id,
        userId,
        data.data,
      );

      client.emit('noteUpdated', note);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('deleteNote')
  async handleDeleteNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() noteId: string,
  ) {
    try {
      const userId = this.connectedClients.get(client.id);
      if (!userId) {
        client.emit('error', { message: 'Usuário não autenticado' });
        return;
      }

      await this.deleteNoteUseCase.execute(noteId, userId);
      client.emit('noteDeleted', { id: noteId });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('getNotes')
  async handleGetNotes(@ConnectedSocket() client: Socket) {
    try {
      const userId = this.connectedClients.get(client.id);
      if (!userId) {
        client.emit('error', { message: 'Usuário não autenticado' });
        return;
      }

      const notes = await this.listNotesUseCase.execute(userId);
      client.emit('notesList', notes);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}
