import { Repository, getRepository } from 'typeorm';
import { ICreateNoteDTO } from 'src/dtos/ICreateNoteDTO';
import { INote } from 'src/entities/INote';
import { INoteRepository } from './../../../repositories/INoteRepository';
import { Note } from '../entities/Note';

export class NoteRepository implements INoteRepository {
    constructor (
        private noteRepository: Repository<Note>
    ) {
        noteRepository = getRepository(Note)
    }
    create(user: ICreateNoteDTO): Promise<INote> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    edit(user: INote, id: string): Promise<INote> {
        throw new Error('Method not implemented.');
    }
    find(id: string): Promise<INote | undefined> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<INote | undefined>[] {
        throw new Error('Method not implemented.');
    }
    
}