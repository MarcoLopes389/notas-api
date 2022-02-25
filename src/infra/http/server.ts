import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import router from './routes/router'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

app.use((req: Request, res: Response, next: NextFunction) => {
    
    res.status(404).json({
        code: 404,
        err: 'Not found'
    })
})

export default app