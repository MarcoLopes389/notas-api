import { IUser } from "src/entities/IUser";

export interface ICreateNoteDTO {
    note: string;
    title: string;
    user: IUser;
}