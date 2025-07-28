const request = require('supertest');
const app = require('../../src/app');

const { Inventory } = require('../../src/model/Inventory');
const { Item } = require('../../src/model/item');

describe('testing GET/ item:id route', () => {
  test('unauthenticated requests are denied', () =>
    request(app).delete('/v1/item/123').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .delete('/v1/item/123')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('Valid ID should return respective Item', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app)
      .get(`/v1/item/${item.id}`)
      .auth('user1@email.com', 'password1');

    expect(storedItem.status).toBe(200);
    expect(storedItem.body.status).toBe('ok');
    expect(storedItem.body.item).toEqual(item);
    expect(storedItem.body.item.id).toEqual(item.id);
  });

  test('Valid Item Tags should be an Array', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app)
      .get(`/v1/item/${item.id}`)
      .auth('user1@email.com', 'password1');

    expect(Array.isArray(storedItem.body.item.tags)).toBe(true);
  });

  test('Valid Item should be an Object', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app)
      .get(`/v1/item/${item.id}`)
      .auth('user1@email.com', 'password1');

    expect(typeof storedItem.body.item === 'object').toBe(true);
  });

  test('Invalid Item should return a Error JSON response', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });

    const storedItem = await request(app)
      .get(`/v1/item/${item.id}`)
      .auth('user1@email.com', 'password1');

    expect(storedItem.status).toBe(404);
    expect(storedItem.body.status).toBe('error');

    expect(typeof storedItem.body.error === 'object').toBe(true);
    expect(storedItem.body.error.code).toEqual(404);
    expect(typeof storedItem.body.item === 'object').toBe(false);
  });
});
