import request from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../app/app';
import createConnection from '../database/index';

describe('Authentication', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it('Should create a new user', async () => {
    const response = await request(app).post('/signup').send({
      username: 'test',
      password: 'test123',
      email: 'test@test.com',
    });

    expect(response.status).toBe(201);
  });

  it('Should fail when passing an invalid e-mail', async () => {
    const response = await request(app).get('/login').send({
      email: 'test@test.co',
      password: 'test123',
    });

    expect(response.status).toBe(400);
  });

  it('Should fail when passing an invalid password', async () => {
    const response = await request(app).get('/login').send({
      email: 'test@test.com',
      password: 'test12',
    });

    expect(response.status).toBe(400);
  });

  it('Should get a user and a token', async () => {
    const response = await request(app).get('/login').send({
      email: 'test@test.com',
      password: 'test123',
    });

    expect(response.status).toBe(200);
  });

  it('Should require authentication', async () => {
    const response = await request(app).get('/status');

    expect(response.status).toBe(401);
  });

  it('Should pass through the auth middleware', async () => {
    const { body } = await request(app).get('/login').send({
      email: 'test@test.com',
      password: 'test123',
    });

    const token = body.token;

    const response = await request(app)
      .get('/status')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
