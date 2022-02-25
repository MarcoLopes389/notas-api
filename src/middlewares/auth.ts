import { Request, Response, NextFunction } from 'express'
import { jwtService } from '../services/JWTService'

export async function Auth (req: Request, res: Response, next: NextFunction) {

    if(res.locals.user) {
        next()
    }

    const token = req.headers.authorization?.replace('Bearer', '').trim()
    try {
        const decoded: any = await jwtService.verify(token || '')
        res.locals.user = decoded
        next()

    } catch {
        res.sendStatus(401)
    }
}