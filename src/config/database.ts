import pg from 'pg'

const db = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Postgres',
    database: 'notasapi'
})

export default db