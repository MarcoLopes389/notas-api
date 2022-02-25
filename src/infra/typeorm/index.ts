import { NoteRepository } from './repositories/NoteRepository';
import { INoteRepository } from 'src/repositories/INoteRepository';
import { IUserRepository } from 'src/repositories/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<INoteRepository>('NoteRepository', NoteRepository)
