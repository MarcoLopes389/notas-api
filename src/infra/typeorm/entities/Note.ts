import { INote } from 'src/entities/INote';
import { IUser } from 'src/entities/IUser';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity('note')
export class Note implements INote {

    @PrimaryColumn({name: 'id', generated: 'uuid'})
    id: string

    @Column({name: 'note', type: 'text'})
    note: string;

    @Column({name: 'title', type: 'text'})
    title: string;

    @Column({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @ManyToOne(() => User, user => user.id)
    user: IUser;
}