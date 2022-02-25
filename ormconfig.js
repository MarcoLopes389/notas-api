module.exports = {
    type: 'postgres',
    port: 5432,
    host: 'localhost',
    username: 'nano',
    password: 'nano',
    database: 'notesapi',
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