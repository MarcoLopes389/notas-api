import { Request, Response } from 'express'
import { UserDatabase } from 'src/infra/typeorm/repositories/DatabaseControl'
import { jwtService } from '../services/JWTService'

export default class RouterUser {

    public static async login(req: Request, res: Response) {
        const { password, email } = req.body

        try {
            const dados = await UserDatabase.auth(password, email)
            const access_token = await jwtService.sign(dados[0], '5 minutes')

            return res.json({
                access_token
            })
        } catch {
            return res.sendStatus(400)
        }
    }

    public static async create(req: Request, res: Response) {
        
        try {

            const { name, email, password } = req.body
            await UserDatabase.create({name: name, email: email, password: password})

            return res.json({
                ok: true
            })

        } catch {

            return res.status(500).json({
                code: 500,
                err: 'Já existe um usuário'
            })
        }
    }

    public static async delete(req: Request, res: Response) {

        try {

            const { id } = req.body
            await UserDatabase.delete(id)

            return res.json({
                ok: true
            })

        } catch {

            return res.status(404).json({
                code: 404,
                err: 'Não foi encontrado nenhum usuário'
            })
        }
    }

    public static async edit(req: Request, res: Response) {

        try {

            const { id, name, email, password } = req.body
            await UserDatabase.edit({name: name, email: email, password: password}, id)

            return res.json({
                ok: true
            })

        } catch {

            return res.status(404).json({
                code: 404,
                err: 'Não foi possível editar usuário'
            })

        }
    }

}