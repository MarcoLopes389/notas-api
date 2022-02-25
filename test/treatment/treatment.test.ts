import supertest from 'supertest'
import app from '../../src/server'

let client

describe('Testes de funcionalidades essenciais', () => {

    test('Se não for passado nenhum id de busca ou inexistente, retorna status 404', async () => {

        const resposta = await supertest(app).get('/notes/list').send({ id: 5000 })

        expect(resposta.status).toBe(404)
    })

    test('Se não for passado nota nenhuma, retorna status 400', async () => {

        const { status } = await supertest(app).post('/notes/new')

        expect(status).toBe(400)

    })

    test('Falha ao encontrar uma rota retorna 404', async () => {

        const { status } = await supertest(app).get('/rotaquenaoexiste')

        expect(status).toBe(404)
    })

    test('Envio de dados de edição inválidos ou faltando retorna erro 400', async () => {

        const { status } = await supertest(app).patch('/notes/edit').send({
            id: 2,
            note: 'Nota qualquer',
            user: 1,
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        })

        expect(status).toBe(400)
    })

    test('Envio de id inexistente a edição retorna erro 404', async () => {
        
        const { status } = await supertest(app).patch('/notes/edit').send({
            id: 5000,
            note: 'Nota qualquer',
            title: 'Um título qualquer',
            user: 1,
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        })

        expect(status).toBe(404)

    }) 

})