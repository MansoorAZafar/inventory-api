const request = require('supertest');
const app = require('../../src/app');
const { Item } = require('../../src/model');

describe('Testing POST /item route', () => {
  test('unauthenticated requests are denied', () =>
    request(app).delete('/v1/item').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .delete('/v1/item')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('adding bad item with no name', async () => {
    const body = JSON.stringify({ price: 20.25, quantity: 2 });

    const res = await request(app)
      .post(`/v1/item`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
  });

  test('adding bad item with no price', async () => {
    const body = JSON.stringify({ name: 'water', quantity: 2 });

    const res = await request(app)
      .post(`/v1/item`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
  });

  test('adding bad item with no quantity', async () => {
    const body = JSON.stringify({ name: 'water', price: 2 });

    const res = await request(app)
      .post(`/v1/item`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
  });

  test('adding item proper', async () => {
    const item = new Item({ name: 'water', quantity: 2, price: 25.25 });
    const body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);
    const id = res.body.id;

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  //
});
