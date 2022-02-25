import { ICreateNoteDTO } from 'src/dtos/ICreateNoteDTO';
import { INote } from 'src/entities/INote';

export interface INoteRepository {
    create(user: ICreateNoteDTO): Promise<INote>;
    delete(id: string): Promise<void>;
    edit(user: INote, id: string): Promise<INote>;
    find(id: string): Promise<INote | undefined>;
    findAll(): Promise<INote | undefined>[]
}