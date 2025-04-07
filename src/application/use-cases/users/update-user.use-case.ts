import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/application/dtos/users/update-user.dto';
import { User } from 'src/domain/users/entities/user.entity';
import { UserRepository } from 'src/infrastructure/persistence/typeorm/repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async verifyIfEmailAlreadyExists(email: string) {
    const userWithEmail = await this.userRepository.findByEmail(email);

    if (userWithEmail) {
      throw new Error('Já existe um usuário com este email');
    }
  }

  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    if (
      updateUserDto.email &&
      updateUserDto.email !== existingUser.getEmail().getValue()
    ) {
      this.verifyIfEmailAlreadyExists(updateUserDto.email);

      existingUser.updateEmail(updateUserDto.email);
    }

    if (updateUserDto.name) {
      existingUser.updateName(updateUserDto.name);
    }

    if (updateUserDto.password) {
      existingUser.updatePassword(updateUserDto.password);
    }

    return this.userRepository.save(existingUser);
  }
}
