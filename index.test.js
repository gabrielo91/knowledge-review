const supertest = require('supertest');

const app = require('./app');

it('Get health check', async () => {
  const res = await supertest(app).get('/api/health-check');
  expect(res.status).toEqual(200);
});
