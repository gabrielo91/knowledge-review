const supertest = require('supertest');
const mockResult = require('./mocks/pokemon.json');
const nock = require('nock');

const app = require('./app');

it('Get health check', async () => {
  const res = await supertest(app).get('/api/health-check');
  expect(res.status).toEqual(200);
});

it('Get pokemon', async () => {
  const res = await supertest(app).get('/api/pokemon');
  expect(res.body).toMatchObject({ count: 1118 });
});

it('Get pokemon filtered', async () => {
  nock('https://pokeapi.co:443').get('/api/v2/pokemon').reply(200, mockResult);

  const res = await supertest(app).get('/api/pokemon?filter=saur');
  expect(res.body).toHaveLength(3);
});
