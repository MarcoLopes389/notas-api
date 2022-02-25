import { Column, PrimaryColumn } from 'typeorm';
import { IUser } from './../../../entities/IUser';
export class User implements IUser {

    @PrimaryColumn({name: 'id', generated: 'uuid'})
    id: string;

    @Column({name: 'name', type: 'text'})
    name: string;

    @Column({name: 'email', type: 'text'})
    email: string;

    @Column({name: 'password', type: 'text'})
    password: string;
}