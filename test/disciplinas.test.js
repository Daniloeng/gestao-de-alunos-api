import request from 'supertest';
import app from '../src/app.js'; 
import { expect } from 'chai';
import { accessToken } from './utils.js';

describe('POST /disciplinas', () => {
  it('should create a new discipline', async () => {
    const token = await accessToken();
    const res = await request(app)
      .post('/api/admin/disciplinas')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        nome: 'Testes de API',
        codigo: 'API101',
        cargaHoraria: 60,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });
});

describe('GET /disciplinas', () => {
  it('should return a list of disciplines', async () => {
    const token = await accessToken();
    const res = await request(app)
      .get('/api/admin/disciplinas')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    // console.log(res.body);
  });
});

describe('GET /disciplinas/:id', () => {
  it('should return a discipline by ID', async () => {
    const id = 'disciplina-programacao-web';
    const token = await accessToken();
    const res = await request(app)
      .get(`/api/admin/disciplinas/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
  });
});

describe('POST /disciplinas/:id/matriculas', () => {
    it('should enroll a student in a discipline', async () => {
        const disciplinaId = 'disciplina-programacao-web';
        const alunoId = 'aluno-bruno-lima';
        const token = await accessToken();
        const res = await request(app)
            .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                'alunoId': alunoId
            });

        expect(res.status).to.equal(201);
        console.log(res.body);
        expect(res.body).to.have.property('dataMatricula');
    });
});

describe('GET /disciplinas/:id/alunos', () => {
    it('should return a list of students enrolled in a discipline', async () => {
        const disciplinaId = 'disciplina-programacao-web';
        const token = await accessToken();
        const res = await request(app)
            .get(`/api/admin/disciplinas/${disciplinaId}/alunos`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        // console.log(res.body);
    });

    it('should token empty return 401 for unauthorized access', async () => {
        const disciplinaId = 'disciplina-programacao-web';
        const res = await request(app)
            .get(`/api/admin/disciplinas/${disciplinaId}/alunos`)
            .set('Content-Type', 'application/json');

        expect(res.status).to.equal(401);
    });
});