import { Request, Response } from 'express'
import { NoteDatabase } from '@src/utils/DatabaseControl'

class RouterNotes {

    public static searchAll(req: Request, res: Response) {
        return res.json({
            ok: true
        })
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

    public static edit(req: Request, res: Response) {

        const { note, title, id } = req.body
        const data = new Date()

        try {

            NoteDatabase.edit({note: note, title: title, updated_at: data.toString(), created_at: '', user: ''}, id)
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

    public static create(req: Request, res: Response){

        const data = new Date()
        const { note, title, user } = req.body

        try {

            NoteDatabase.create({note: note, title: title, user: user, created_at: data.toString(), updated_at: ''})

            return res.json({
                ok: true
            })

        } catch {

            return res.status(400).json({
                code: 400,
                err: 'Dado inválido'
            })

        }
    }

    public static delete(req: Request, res: Response) {

        const { id } = req.body

        try {

            NoteDatabase.delete(id)
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