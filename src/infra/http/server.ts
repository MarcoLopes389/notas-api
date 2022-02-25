import { database } from 'src/config/Database';
import express, { Express } from 'express'
import cors from 'cors'

import router from './routes/router'

class App {
    server: Express;

    constructor() {
        this.server = express()
    }

    setup () {
        this.middlewares()
        this.routes()
        this.connections()
        process.on('SIGTERM', this.finish)
        process.on('SIGKILL', this.finish)
    }

    middlewares () {
        this.server.use(cors())
        this.server.use(express.json())
    }

    routes () {
        this.server.use('/', router)
    }

    async connections () {
        await database.connect()
    }

    async finish () {
        await database.disconnect()
        process.exit()
    }
}

export const app = new App()