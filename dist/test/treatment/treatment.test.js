"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
describe('Testes de funcionalidades essenciais', () => {
    beforeAll(() => {
    });
    test('Se não for passado nenhum id de busca ou inexistente, retorna status 400', async () => {
        const resposta = await supertest_1.default(server_1.default).get('/notes/ghkv');
        expect(resposta.status).toBe(400);
    });
    test('Se não for passado nota nenhuma, retorna status 400', async () => {
        const { status } = await supertest_1.default(server_1.default).post('/notes/new');
        expect(status).toBe(400);
    });
    test('Falha ao encontrar uma rota retorna 404', async () => {
        const { status } = await supertest_1.default(server_1.default).get('rotaquenaoexiste');
        expect(status).toBe(404);
    });
    test('Envio de dados de edição inválidos retorna erro 500', async () => {
        const { status } = await supertest_1.default(server_1.default).patch('/notes/id');
        expect(status).toBe(500);
    });
    afterAll(() => {
    });
});
//# sourceMappingURL=treatment.test.js.map