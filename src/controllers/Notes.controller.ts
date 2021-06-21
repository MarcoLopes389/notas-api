import { Request, Response } from 'express'

class RouterNotes {

    public static search(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

    public static edit(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

    public static create(req: Request, res: Response){
        return res.json({
            ok: true
        })
    }

    public static delete(req: Request, res: Response) {
        return res.json({
            ok: true
        })
    }

}

export default RouterNotes