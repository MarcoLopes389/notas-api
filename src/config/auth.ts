import { Request, Response } from 'express'
import { JWTservice } from '../utils/JWT'

export async function Auth (req: Request, res: Response) {

    const token = req.headers.authorization?.replace('Bearer', '')
    try {
        const decoded: any = await JWTservice.verify(token || '')
        res.locals.user = decoded.id

    } catch {
        res.sendStatus(401)
    }
}