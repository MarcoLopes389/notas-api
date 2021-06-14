import supertest from 'supertest'
import app from '../../src/server'

describe('Testes de funcionalidades essenciais', () => {
    test('Se não for passado nenhum id de busca, retorna status 400', async () => {
        const resposta = await supertest(app).get('/notes/ghkv')
        expect(resposta.status).toBe(400)
    })
})