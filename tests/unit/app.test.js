const request = require('supertest');
const app = require('../../src/app');

describe('Error Handling', () => {
  test('test 404 middleware', async () => {
    const res = await request(app).get('/non_existent_resource');
    expect(res.status).toBe(404);

    expect(res.body.status).toBe('error');
    expect(typeof res.body.error === 'object').toBe(true);
    expect(res.body.error.message).toBe('resource not found');
    expect(res.body.error.code).toBe(404);
  });
});
