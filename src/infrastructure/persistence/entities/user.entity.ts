import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NoteEntity } from './note.entity';
import { User } from 'src/domain/users/entities/user.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => NoteEntity, (note) => note.owner)
  notes: NoteEntity[];

  toDomain(): User {
    return new User(
      this.name,
      this.email,
      this.password,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.getId();
    userEntity.name = user.getName();
    userEntity.email = user.getEmail();
    userEntity.password = user.getPassword();
    userEntity.createdAt = user.getCreatedAt();
    userEntity.updatedAt = user.getUpdatedAt();
    return userEntity;
  }
}
