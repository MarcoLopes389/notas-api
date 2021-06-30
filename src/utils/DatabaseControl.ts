import db from '../config/database'
import note from '@src/@types/note.type'
import user from '@src/@types/user.type'

export class NoteDatabase {

    public static async create(nota: note){

        const query = 'insert into notes("note", "title", "user", "created_at") values($1, $2, $3, $4)'
        const { note, title, user, created_at } = nota
        const client = await db.connect()
        await client.query(query, [note, title, user, created_at])

    }

    public static async delete(id: Number){

        const query = 'delete from notes where id = $1'
        const client = await db.connect()
        await client.query(query, [id])

    }

    public static async edit(nota: note, id: Number){

        const query = 'update notes set note = $1, title = $2, updated_at = $3 where id = $4'
        const { note, title, updated_at } = nota
        const client = await db.connect()
        await client.query(query, [note, title, updated_at, id])

    }

    public static async find(id: Number){

        const query = 'select from notes where id = $1'
        const client = await db.connect()
        await client.query(query, [id])

    }

    public static async findAll(){

        const query = 'select * from notes'
        const client = await db.connect()
        await client.query(query)

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