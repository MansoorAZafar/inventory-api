const request = require('supertest');
const app = require('../../src/app');
const { version } = require('../../package.json');

describe('Health Check', () => {
  test('Query the root of the app', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.author).toBe('MansoorAZafar');
    expect(res.body.version).toBe(version);
  });
});
