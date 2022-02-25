const path = require('path')

module.exports = {
    type: 'postgres',
    port: process.env.PORT,
    host: process.env.HOSTNAME,
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    migrations: [
        path.resolve('src', 'infra', 'typeorm', 'migrations', '*.ts')
    ],
    entities: [
        path.resolve('src', 'infra', 'typeorm', 'entities', '*.ts')
    ],
    cli: {
        migrationsDir: path.resolve('src', 'infra', 'typeorm', 'migrations'),
    },
}