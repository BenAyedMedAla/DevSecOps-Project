const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('répond 200 avec status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it("n'expose pas l'en-tête X-Powered-By", async () => {
    const res = await request(app).get('/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

describe('GET /api/add', () => {
  it('additionne deux nombres', async () => {
    const res = await request(app).get('/api/add').query({ a: 2, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });

  it('gère les nombres négatifs et décimaux', async () => {
    const res = await request(app).get('/api/add').query({ a: -1.5, b: 4 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 2.5 });
  });

  it('refuse un paramètre non numérique (400)', async () => {
    const res = await request(app).get('/api/add').query({ a: 'abc', b: 3 });
    expect(res.status).toBe(400);
  });

  it('refuse un paramètre manquant (400)', async () => {
    const res = await request(app).get('/api/add').query({ a: 1 });
    expect(res.status).toBe(400);
  });
});
