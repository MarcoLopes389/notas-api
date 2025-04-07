import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/application/dtos/notes/create-note.dto';
import { ShareNoteDto } from 'src/application/dtos/notes/share-note.dto';
import { UpdateNoteDto } from 'src/application/dtos/notes/update-note.dto';
import { CreateNoteUseCase } from 'src/application/use-cases/notes/create-note.use-case';
import { DeleteNoteUseCase } from 'src/application/use-cases/notes/delete-note.use-case';
import { GetNoteUseCase } from 'src/application/use-cases/notes/get-note.use-case';
import { ListNotesUseCase } from 'src/application/use-cases/notes/list-notes.use-case';
import { ShareNoteUseCase } from 'src/application/use-cases/notes/share-note.use-case';
import { UpdateNoteUseCase } from 'src/application/use-cases/notes/update-note.use-case';
import { UserRef } from 'src/infrastructure/auth/decorators/user.decorator';

@ApiTags('Notas')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly listNotesUseCase: ListNotesUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly shareNoteUseCase: ShareNoteUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova nota' })
  @ApiResponse({
    status: 201,
    description: 'Nota criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @UserRef('id') userId: string,
  ) {
    return this.createNoteUseCase.execute(createNoteDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as notas do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notas retornada com sucesso',
  })
  async listNotes(@UserRef('id') userId: string) {
    return this.listNotesUseCase.execute(userId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obter uma nota específica' })
  @ApiResponse({
    status: 200,
    description: 'Nota retornada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Nota não encontrada',
  })
  async getNote(@Param('id') id: string) {
    return this.getNoteUseCase.execute(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar uma nota' })
  @ApiResponse({
    status: 200,
    description: 'Nota atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Nota não encontrada',
  })
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @UserRef('id') userId: string,
  ) {
    return this.updateNoteUseCase.execute(id, userId, updateNoteDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletar uma nota' })
  @ApiResponse({
    status: 200,
    description: 'Nota deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Nota não encontrada',
  })
  async deleteNote(@Param('id') id: string, @UserRef('id') userId: string) {
    return this.deleteNoteUseCase.execute(id, userId);
  }

  @Post('/:id/share')
  @ApiOperation({ summary: 'Compartilhar uma nota com outro usuário' })
  @ApiResponse({
    status: 200,
    description: 'Nota compartilhada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Nota não encontrada',
  })
  async shareNote(@Param('id') id: string, @Body() shareNoteDto: ShareNoteDto) {
    return this.shareNoteUseCase.execute(id, shareNoteDto);
  }
}
