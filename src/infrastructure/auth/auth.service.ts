import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/users/entities/user.entity';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { UserRepository } from '../persistence/repositories/user.repository';
import { CryptographyAdapter } from '../security/cryptography.adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly cryptographyAdapter: CryptographyAdapter,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await this.cryptographyAdapter.compare(
      loginUserDto.password,
      user.getPassword(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  generateTokens(user: User) {
    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
