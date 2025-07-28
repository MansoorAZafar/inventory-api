const request = require('supertest');
const app = require('../../src/app');
const { Item } = require('../../src/model');

describe('Testing POST /item route', () => {
  test('adding bad item with no name', async () => {
    const body = JSON.stringify({ price: 20.25, quantity: 2 });

    expect(
      async () =>
        await request(app)
          .post('/v1/item')
          .set('Content-Type', 'application/json')
          .send(body)
    );
  });

  test('adding bad item with no price', async () => {
    const body = JSON.stringify({ name: 'water', quantity: 2 });

    expect(
      async () =>
        await request(app)
          .post('/v1/item')
          .set('Content-Type', 'application/json')
          .send(body)
    );
  });

  test('adding bad item with no quantity', async () => {
    const body = JSON.stringify({ name: 'water', price: 2 });

    expect(
      async () =>
        await request(app)
          .post('/v1/item')
          .set('Content-Type', 'application/json')
          .send(body)
    );
  });

  test('adding item proper', async () => {
    const item = new Item({ name: 'water', quantity: 2, price: 25.25 });
    const body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .set('Content-Type', 'application/json')
      .send(body);
    const id = res.body.id;

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app).get(`/v1/item/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    await request(app).delete(`/v1/item/${id}`);
  });

  //
});
