import db from '../config/database'
import note from '@src/@types/note.type'
import user from '@src/@types/user.type'

const client = db.connect()

export class NoteDatabase {

    public static async create(note: note){
        
    }

    public static async delete(id: Number){

    }

    public static async edit(note: note, id: Number){

    }

    public static async find(id: Number){

    }

    public static async findAll(){

    }

}

export class UserDatabase {
    
    public static async create(user: user){

    }

    public static async delete(id: Number){

    }

    public static async edit(user: user, id: Number){

    }

    public static async find(id: Number){

    }

    public static async findAll(){

    }
}