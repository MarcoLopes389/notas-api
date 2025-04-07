import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/users/entities/user.entity';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { UserRepository } from '../persistence/typeorm/repositories/user.repository';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await compare(
      loginUserDto.password,
      user.getPassword().getValue(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  generateTokens(user: User) {
    const payload = {
      sub: user.getId(),
      email: user.getEmail().getValue(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
