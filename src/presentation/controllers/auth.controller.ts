import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { LocalAuthGuard } from '../../infrastructure/auth/guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/domain/users/entities/user.entity';
import { UserRef } from 'src/infrastructure/auth/decorators/user.decorator';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Realizar login' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  login(@UserRef() user: User) {
    return this.authService.generateTokens(user);
  }
}
