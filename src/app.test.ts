import request from 'supertest';
import { app } from './app';

describe('Account API', () => {
  let accountId: number | undefined;

  it('should create a new account', async () => {
    const response = await request(app)
      .post('/accounts')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        address: '123 Main St',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    accountId = response.body.id as number;
  });

  it('should get an existing account', async () => {
    if (!accountId) return;

    const response = await request(app).get(`/accounts/${accountId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(accountId);
  });

  it('should return 404 when getting a non-existent account', async () => {
    const response = await request(app).get('/accounts/9999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Account not found');
  });

  it('should update an existing account', async () => {
    if (!accountId) return;

    const response = await request(app)
      .put(`/accounts/${accountId}`)
      .send({
        name: 'John Doe Updated',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(accountId);
    expect(response.body.name).toBe('John Doe Updated');
  });

  it('should delete an existing account', async () => {
    if (!accountId) return;

    const response = await request(app).delete(`/accounts/${accountId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(accountId);
  });

  it('should return 404 when deleting a non-existent account', async () => {
    const response = await request(app).delete('/accounts/9999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Account not found');
  });
});
