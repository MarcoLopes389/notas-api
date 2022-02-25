import { User } from './../entities/User';
import { IUser } from 'src/entities/IUser';
import { IUserRepository } from 'src/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from 'src/dtos/ICreateUserDTO';

export class UserRepository implements IUserRepository {
    constructor (
        private userRepository: Repository<User>
    ) {
        userRepository = getRepository(User)
    }
    auth(password: string, email: string): Promise<IUser | Error> {
        throw new Error('Method not implemented.');
    }
    create(user: ICreateUserDTO): Promise<IUser> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    edit(user: IUser, id: string): Promise<IUser> {
        throw new Error('Method not implemented.');
    }
    find(id: string): Promise<IUser | undefined> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<IUser | undefined>[] {
        throw new Error('Method not implemented.');
    }
    
}