import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { IDatabase } from './IDatabase';
export class Database implements IDatabase {
    connection: Connection

    async connect(): Promise<void> {
        console.log('[ Database ] Connecting...')
        const options = await getConnectionOptions()
        this.connection = await createConnection(options)
        console.log('[ Database ] Database is Connected!')
    }
    async disconnect(): Promise<void> {
        await this.connection.close()
    }

}

export const database = new Database()