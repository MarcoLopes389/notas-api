import { Request, Response } from 'express'

export class User {

    public static login(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

    public static create(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

    public static delete(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

    public static edit(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

}