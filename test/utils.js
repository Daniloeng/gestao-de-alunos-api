import request from 'supertest';
import { createRequire } from 'node:module';
import app from '../src/app.js';

const require = createRequire(import.meta.url);
const testData = require('./data/test-data.json');

async function login(credentials) {
	const res = await request(app)
		.post('/api/auth/login')
		.set('Content-Type', 'application/json')
		.send(credentials);

	return res;
}

export async function loginAsAdmin(credentials = testData.admin) {
	const res = await login(credentials);
	return res.body.token;
}

export async function loginAsStudent(credentials = testData.student) {
	const res = await login(credentials);
	return res.body.token;
}

export const accessToken = loginAsAdmin;
