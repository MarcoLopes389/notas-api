import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './persistence/typeorm/entities/user.entity';
import { NoteEntity } from './persistence/typeorm/entities/note.entity';
import { NoteShareEntity } from './persistence/typeorm/entities/note-share.entity';
import { NoteShareRepository } from './persistence/typeorm/repositories/note-share.repository';
import { NoteRepository } from './persistence/typeorm/repositories/note.repository';
import { UserRepository } from './persistence/typeorm/repositories/user.repository';
import { getTypeOrmConfig } from './persistence/typeorm/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';

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
  ],
  exports: [UserRepository, NoteRepository, NoteShareRepository, AuthService],
})
export class InfrastructureModule {}
