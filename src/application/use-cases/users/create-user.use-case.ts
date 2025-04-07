import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { User } from 'src/domain/users/entities/user.entity';
import { UserRepository } from 'src/infrastructure/persistence/typeorm/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new Error('Já existe um usuário com este email');
    }

    const user = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return this.userRepository.save(user);
  }
}
