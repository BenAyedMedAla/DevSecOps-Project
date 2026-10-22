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

// Non-régression : la route /api/ping vulnérable à l'injection de commande
// (CWE-78, branche feature/faille-volontaire) a été supprimée et ne doit pas revenir.
describe('GET /api/ping (supprimée)', () => {
  it("n'existe plus (404)", async () => {
    const res = await request(app).get('/api/ping').query({ host: '127.0.0.1;id' });
    expect(res.status).toBe(404);
  });
});
