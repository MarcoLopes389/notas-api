import { IUser } from './../entities/IUser';
import { ICreateUserDTO } from './../dtos/ICreateNoteDTO';

export interface IUserRepository {
    auth(password: string, email: string): Promise<IUser | Error>;
    create(user: ICreateUserDTO): Promise<IUser>;
    delete(id: string): Promise<void>;
    edit(user: IUser, id: string): Promise<IUser>;
    find(id: string): Promise<IUser | undefined>;
    findAll(): Promise<IUser | undefined>[]
}