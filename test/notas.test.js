import request from 'supertest';
import app from '../src/app.js'; 
import { expect } from 'chai';
import { accessToken } from './utils.js';

describe('POST /notas', () => {
    it('should create a new grade', async () => {
        const token = await accessToken();
        const res = await request(app)
            .post('/api/admin/notas')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                alunoId: 'aluno-bruno-lima',
                disciplinaId: 'disciplina-programacao-web',
                valor: 9.5,
                tipo: 'prova',
                descricao: 'Prova final de programação web',
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
    });
});

describe('GET /notas', () => {
    it('should return a list of grades', async () => {
        const token = await accessToken();
        const res = await request(app)
            .get('/api/admin/notas')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        console.log(res.body);
    });

    it('should return a list of grades for a specific student', async () => {
        const token = await accessToken();
        const alunoId = 'aluno-bruno-lima';
        const res = await request(app)
            .get(`/api/admin/notas?alunoId=${alunoId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        console.log(res.body);
    });
    
    it('should return a list of grades for a specific discipline', async () => {
        const token = await accessToken();
        const disciplinaId = 'disciplina-programacao-web';
        const res = await request(app)
            .get(`/api/admin/notas?disciplinaId=${disciplinaId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        console.log(res.body);
    });
});