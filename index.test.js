const nock = require('nock');
const sinon = require('sinon');
const supertest = require('supertest');
const mockResult = require('./mocks/pokemon.json');
const _ = require('lodash');

const app = require('./app');
describe('Test index.js', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('Get health check', async () => {
    const res = await supertest(app).get('/api/health-check');
    expect(res.status).toEqual(200);
  });

  it('Get pokemon', async () => {
    const res = await supertest(app).get('/api/pokemon');
    var spy = sandbox.spy(_, 'filter');
    expect(spy.calledOnce).toBeFalsy();
    expect(res.body).toMatchObject({ count: 1118 });
  });

  it('Get pokemon filtered', async () => {
    nock('https://pokeapi.co:443')
      .get('/api/v2/pokemon')
      .reply(200, mockResult);

    var spy = sandbox.spy(_, 'filter');
    const res = await supertest(app).get('/api/pokemon?filter=saur');
    expect(spy.calledOnce).toBeTruthy();
    expect(res.body).toHaveLength(3);
  });
});
