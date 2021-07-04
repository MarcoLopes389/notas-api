import { Request, Response } from 'express'
import { JWTservice } from '../utils/JWT'

export async function Auth (req: Request, res: Response) {

    const token = req.headers.authorization?.replace('Bearer', '')
    try {
        await JWTservice.verify(token || '')

    } catch {
        res.sendStatus(401)
    }
}