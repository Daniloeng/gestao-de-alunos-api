import request from 'supertest';
import app from '../src/app.js'; 
import { expect } from 'chai';
import db from '../src/database/db.js';

describe('POST /login', () => {
  it('should return 200 and a token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ 
            email: 'admin@escola.com', 
            senha: 'admin123' 
        });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

    it('should return 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ 
            email: 'invalid@escola.com', 
            senha: 'invalid123' 
        });
    
    expect(res.status).to.equal(401);
  });

  it('should return 400 for missing email or password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ 
            email: '', 
            senha: 'admin123' 
        });
    
    expect(res.status).to.equal(400);
  });

  it('should return 500 when the database connection fails', async () => {
    const originalAll = db.all;
    db.all = () => {
      throw new Error('Database connection failed');
    };

    try {
      const res = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'admin@escola.com',
          senha: 'admin123'
        });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error', 'Erro interno do servidor.');
    } finally {
      db.all = originalAll;
    }
  });
});