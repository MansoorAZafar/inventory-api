const request = require('supertest');
const app = require('../../src/app');

const { Item } = require('../../src/model');

describe('Testing PUT /v1/item/id', () => {
  test('unauthenticated requests are denied', () =>
    request(app).delete('/v1/item/123').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .delete('/v1/item/123')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('trying to update the ID of an item', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.id = 'should throw';
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();

    item.id = id;

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  test('trying to update quantity to string', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.quantity = 'should throw';
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
    item.id = id;

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  test('trying to update quantity to bad number', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.quantity = -1;
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
    item.id = id;

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  test('trying to update price to string', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.price = 'should throw';
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
    item.id = id;

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  test('trying to update price to bad number', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.price = -1;
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
    item.id = id;

    await request(app)
      .delete(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');
  });

  test('updating item proper', async () => {
    let item = new Item({ name: 'water', price: 22.5, quantity: 5 });
    let body = JSON.stringify(item);

    let res = await request(app)
      .post('/v1/item')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    const id = res.body.id;

    // Make sure everything's the same
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(id).toBe(item.id);

    res = await request(app)
      .get(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.item).toEqual(item);

    // Update the items ID
    item.name = 'should be fine';
    body = JSON.stringify(item);

    res = await request(app)
      .put(`/v1/item/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.id).toBe(id);

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
});
