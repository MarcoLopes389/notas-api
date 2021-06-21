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
    test('Nota sendo retornada com sucesso', async () => {
        const resposta = await supertest_1.default(server_1.default).get('/notes/ghkv');
        let ok;
        if (typeof resposta == 'object') {
            ok = true;
        }
        else {
            ok = false;
        }
        expect(ok).toBe(true);
    });
    let id;
    test('Nota sendo criada com sucesso', async () => {
        const input = {
            note: 'Nota qualquer',
            title: 'Um título qualquer',
            user: 'Marco',
            created_at: '2021/06/14',
            updated_at: '2021/06/14'
        };
        const { status, body } = await supertest_1.default(server_1.default).post('/notes/new').send(input);
        id = body.id;
        expect(status).toBe(200);
    });
    test('Nota sendo deletada com sucesso', async () => {
        const { status } = await supertest_1.default(server_1.default).delete(`/notes/${id}`);
        expect(status).toBe(200);
    });
    afterAll(() => {
    });
});
//# sourceMappingURL=functional.test.js.map