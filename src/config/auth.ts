import { Request, Response, NextFunction } from 'express'
import { JWTservice } from '../utils/JWT'

export async function Auth (req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization?.replace('Bearer', '')
    try {
        const decoded: any = await JWTservice.verify(token || '')
        res.locals.user = decoded.id
        next()

    } catch {
        res.sendStatus(401)
    }
}