import { IUser } from './IUser';

export interface INote {
    id: string;
    note: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    user: IUser;
}
