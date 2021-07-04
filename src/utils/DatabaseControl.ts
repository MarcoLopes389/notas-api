import db from '../config/database'
import note from '@src/@types/note.type'
import user from '@src/@types/user.type'
import { createBuilderStatusReporter } from 'typescript'

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
        const resposta = await client.query('select note from notes where id = $1', [id])

        if(resposta.rows.length == 0) {
            throw Error('Id não especificado')
        }
        await client.query(query, [note, title, updated_at, id])

    }

    public static async find(id: Number){

        const query = 'select * from notes where id = $1'
        const client = await db.connect()
        const resposta = await client.query(query, [id])
        if(resposta.rows.length == 0) {
            throw Error('Não foram encontrados dados')
        } else {
            return resposta.rows
        }

    }

    public static async findAll(user: Number){

        const query = 'select note, title, id from notes where "user" = $1'
        const client = await db.connect()
        const resposta = await client.query(query, [user])
        if(resposta.rows.length == 0) {
            throw Error('Não foram encontrados dados')
        } else {
            return resposta.rows
        }

    }

}

export class UserDatabase {

    public static async auth(password: String, email: String) {

        const query = 'select * from users where "password" = $1 and "email" = $2'
        const client = await db.connect()
        const resposta = await client.query(query, [password, email])
        return resposta.rows
    }
    
    public static async create(user: user){

        const query = 'insert into users("name", "email", "password") values($1, $2, $3)'
        const { name, email, password } = user
        const client = await db.connect()
        await client.query(query, [name, email, password])

    }

    public static async delete(id: Number){

        const query = 'delete from users where id = $1'
        const client = await db.connect()
        await client.query(query, [id])

    }

    public static async edit(user: user, id: Number){

        const query = 'update users set name = $1, email = $2, password = $3 where id = $4'
        const { name, email, password } = user
        const client = await db.connect()
        await client.query(query, [name, email, password, id])

    }

    public static async find(id: Number){

        const query = 'select * from users where id = $1'
        const client = await db.connect()
        await client.query(query, [id])

    }

    public static async findAll(){

        const query = 'select * from users'
        const client = await db.connect()
        await client.query(query)

    }
}