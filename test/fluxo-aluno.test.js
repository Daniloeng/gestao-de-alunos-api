import request from 'supertest';
import { createRequire } from 'node:module';
import { expect } from 'chai';
import app from '../src/app.js';
import { loginAsAdmin, loginAsStudent } from './utils.js';

const require = createRequire(import.meta.url);
const testData = require('./data/test-data.json');

describe('Fluxo de cadastro e entrega do aluno', () => {
  let adminToken;

  before(async () => {
    adminToken = await loginAsAdmin();
  });

  it('admin cadastra um aluno', async () => {
    const res = await request(app)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(testData.studentRegistration);

    expect(res.status).to.equal(201);
    expect(res.body).to.include({
      nome: testData.studentRegistration.nome,
      email: testData.studentRegistration.email,
      matricula: testData.studentRegistration.matricula,
    });
    expect(res.body).to.not.have.property('senha');
  });

  for (const delivery of testData.deliveries) {
    it(`aluno registra a entrega de ${delivery.titulo}`, async () => {
      const studentToken = await loginAsStudent();
      const res = await request(app)
        .post(`/api/alunos/${delivery.alunoId}/trabalhos`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          disciplinaId: delivery.disciplinaId,
          titulo: delivery.titulo,
          descricao: delivery.descricao,
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.include({
        alunoId: delivery.alunoId,
        disciplinaId: delivery.disciplinaId,
        titulo: delivery.titulo,
        status: 'entregue',
      });
    });
  }
});
