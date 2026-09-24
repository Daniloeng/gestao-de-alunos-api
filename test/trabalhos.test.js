import request from 'supertest';
import app from '../src/app.js'; 
import { expect } from 'chai';
import { accessToken } from './utils.js';

describe('GET /trabalhos', () => { 
    it('should return a list of assignments', async () => {
        const token = await accessToken();
        const res = await request(app)
            .get('/api/admin/trabalhos')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        console.log(res.body);
    });
});

describe('GET /trabalhos/:id', () => {
    it('should return an assignment by ID', async () => {
        const id = 'trabalho-ana-lista-exercicios-1';
        const token = await accessToken();
        const res = await request(app)
            .get(`/api/admin/trabalhos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
            
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
    });
});