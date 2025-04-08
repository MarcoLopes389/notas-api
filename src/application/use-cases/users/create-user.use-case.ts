import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { User } from 'src/domain/users/entities/user.entity';
import { Password } from 'src/domain/users/value-objects/password.value-object';
import { UserRepository } from 'src/infrastructure/persistence/repositories/user.repository';
import { CryptographyAdapter } from 'src/infrastructure/security/cryptography.adapter';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyAdapter: CryptographyAdapter,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new Error('Já existe um usuário com este email');
    }

    const password = new Password(createUserDto.password);
    const encryptedPassword = await this.cryptographyAdapter.encrypt(
      password.getValue(),
    );

    const user = new User(
      createUserDto.name,
      createUserDto.email,
      encryptedPassword,
    );

    return this.userRepository.save(user);
  }
}
