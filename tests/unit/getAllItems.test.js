const request = require('supertest');
const app = require('../../src/app');
const { Inventory, Item } = require('../../src/model');

describe('Testing GET /items route', () => {
  test('unauthenticated requests are denied', () =>
    request(app).delete('/v1/items').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app)
      .delete('/v1/items')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('Getting all items with no items return empty array', async () => {
    const allItems = await request(app)
      .get('/v1/items')
      .auth('user1@email.com', 'password1');

    expect(allItems.status).toBe(200);
    expect(allItems.body.status).toBe('ok');

    expect(allItems.body.items).toEqual([]);
  });

  test('Getting all items  return items', async () => {
    const items = [
      new Item({ name: 'water', price: 1.25, quantity: 2 }),
      new Item({ name: 'chips', price: 2.23, quantity: 12 }),
      new Item({ name: 'bread', price: 3, quantity: 0 }),
    ];

    items.forEach(async (item) => {
      await Inventory.save(item);
    });

    const allItems = await request(app)
      .get('/v1/items')
      .auth('user1@email.com', 'password1');
    items.forEach(async (item) => {
      await Inventory.deleteItem(item.id);
    });

    expect(allItems.status).toBe(200);
    expect(allItems.body.status).toBe('ok');
    expect(Array.isArray(allItems.body.items));
    expect(allItems.body.items).toEqual(items);
  });
});
