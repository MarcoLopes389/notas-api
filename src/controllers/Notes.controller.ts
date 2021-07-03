import { Request, Response } from 'express'
import { NoteDatabase } from '../utils/DatabaseControl'

class RouterNotes {

    public static async searchAll(req: Request, res: Response) {

        const { user } = req.body

        try {
            const resposta = await NoteDatabase.findAll(user)
            return res.json(resposta)
        } catch {
            return res.status(404).json({
                code: 404,
                err: 'Não foram encontradas notas'
            })
        }
    }

    public static async search(req: Request, res: Response) {

        const { id } = req.body

        try {

            const resposta = await NoteDatabase.find(id)
            return res.json(resposta)

        } catch {

            return res.status(404).json({
                code: 404,
                err: 'Dado não encontrado'
            })
        }
    }

    public static async edit(req: Request, res: Response) {

        const { note, title, id } = req.body
        const data = new Date()

        if(note == null || title == null || id == null) {
            return res.status(400).json({
                code: 400,
                err: 'Dados faltando'
            })
        }

        try {

            await NoteDatabase.edit({note: note, title: title, updated_at: data.toString(), created_at: '', user: ''}, id)
            return res.json({
                ok: true
            })

        } catch {

            return res.status(404).json({
                code: 404,
                err: 'Não encontrado'
            })

        }
    }

    public static async create(req: Request, res: Response){

        const data = new Date()
        const { note, title, user } = req.body

        if(note == null || title == null || user == null) {
            return res.status(400).json({
                code: 400,
                err: 'Dados faltando'
            })
        }

        try {

            await NoteDatabase.create({note: note, title: title, user: user, created_at: data.toString(), updated_at: ''})

            return res.json({
                ok: true
            })

        } catch {

            return res.status(500).json({
                code: 500,
                err: 'Nota já existe'
            })

        }
    }

    public static async delete(req: Request, res: Response) {

        const { id } = req.body

        try {

            await NoteDatabase.delete(id)
            return res.json({
                ok: true
            })

        } catch {

            return res.status(404).json({
                code: 404,
                err: 'Dado não encontrado'
            })

        }
    }

}

export default RouterNotes