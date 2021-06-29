import supertest from 'supertest'
import app from '../../src/server'

let client

describe('Testes de funcionalidades essenciais', () => {
    beforeAll(() => {

    })

    test('Se não for passado nenhum id de busca ou inexistente, retorna status 400', async () => {

        const resposta = await supertest(app).get('/notes/ghkv')

        expect(resposta.status).toBe(400)
    })

    test('Se não for passado nota nenhuma, retorna status 400', async () => {

        const { status } = await supertest(app).post('/notes/new')

        expect(status).toBe(400)

    })

    test('Falha ao encontrar uma rota retorna 404', async () => {

        const { status } = await supertest(app).get('/rotaquenaoexiste')

        expect(status).toBe(404)
    })

    test('Envio de dados de edição inválidos retorna erro 500', async () => {

        const { status } = await supertest(app).patch('/notes/id')

        expect(status).toBe(500)
    })

    test('Ao criar uma postagem se ela for repetida retorna uma mensagem', async () => {

        await supertest(app).post('/notes/new').send({
            note: 'Nota qualquer',
            title: 'Um título qualquer',
            user: 'Marco',
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        })

        const { status } = await supertest(app).post('/notes/new').send({
            note: 'Nota qualquer',
            title: 'Um título qualquer',
            user: 'Marco',
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        })

        expect(status).toBe(500)
    })

    afterAll(() => {
        
    })
})