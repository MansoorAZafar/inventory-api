const request = require('supertest');
const app = require('../../src/app');
const { Inventory, Item } = require('../../src/model');

describe('Testing GET /items route', () => {
  test('Getting all items with no items return empty array', async () => {
    const allItems = await request(app).get('/v1/items');
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

    const allItems = await request(app).get('/v1/items');
    items.forEach(async (item) => {
      await Inventory.deleteItem(item.id);
    });

    expect(allItems.status).toBe(200);
    expect(allItems.body.status).toBe('ok');
    expect(Array.isArray(allItems.body.items));
    expect(allItems.body.items).toEqual(items);
  });
});
