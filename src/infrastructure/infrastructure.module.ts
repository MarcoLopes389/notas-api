import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NoteShareRepository } from './persistence/repositories/note-share.repository';
import { NoteRepository } from './persistence/repositories/note.repository';
import { UserRepository } from './persistence/repositories/user.repository';
import { getTypeOrmConfig } from './persistence/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { NoteShareEntity } from './persistence/entities/note-share.entity';
import { NoteEntity } from './persistence/entities/note.entity';
import { UserEntity } from './persistence/entities/user.entity';
import { CryptographyAdapter } from './security/cryptography.adapter';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, NoteEntity, NoteShareEntity]),
  ],
  providers: [
    UserRepository,
    NoteRepository,
    NoteShareRepository,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    CryptographyAdapter,
  ],
  exports: [
    UserRepository,
    NoteRepository,
    NoteShareRepository,
    AuthService,
    CryptographyAdapter,
    JwtModule,
  ],
})
export class InfrastructureModule {}
