import { Controller, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';
import { UpdateUserUseCase } from 'src/application/use-cases/users/update-user.use-case';
import { User } from 'src/domain/users/entities/user.entity';
import { UserRef } from 'src/infrastructure/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou email já em uso',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({
    status: 400,
    description: 'Email já em uso por outro usuário',
  })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserRef('id') userId: string,
  ): Promise<User> {
    if (id !== userId) {
      throw new Error('Você não tem permissão para atualizar este usuário');
    }

    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
