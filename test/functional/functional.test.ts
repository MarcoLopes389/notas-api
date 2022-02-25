import supertest from 'supertest'
import app from '../../src/server'

describe('Testes de funcionalidades essenciais', () => {

    test('Nota sendo retornada com sucesso', async () => {

        const { body } = await supertest(app).get('/notes/list').send({ id: 4 })

        let ok

        if(typeof body == 'object' && body.note != null || body.note == undefined) {
            ok = true
        } else {
            ok = false
        } 
        expect(ok).toBe(true)
    })

    let id: String

    test('Nota sendo criada com sucesso', async () => {

        const input = {
            note: 'Nota qualquer',
            title: 'Um título qualquer',
            user: 1,
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        }

        const { status, body } = await supertest(app).post('/notes/new').send(input)

        id = body.id

        expect(status).toBe(200)

    })

    test('Nota sendo deletada com sucesso', async () => {

        const { status } = await supertest(app).delete(`/notes/delete`).send({ id: id })

        expect(status).toBe(200)
    })

})