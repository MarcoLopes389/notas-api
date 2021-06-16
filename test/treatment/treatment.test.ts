import supertest from 'supertest'
import app from '../../src/server'

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

    test('Falha ao encontrar uma rota', async () => {

        const { status } = await supertest(app).get('rotaquenaoexiste')

        expect(status).toBe(404)
    })

    afterAll(() => {
        
    })
})