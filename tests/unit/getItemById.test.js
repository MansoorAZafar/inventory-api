const request = require('supertest');
const app = require('../../src/app');

const { Inventory } = require('../../src/model/Inventory');
const { Item } = require('../../src/model/item');

describe('testing GET/ item:id route', () => {
  test('Valid ID should return respective Item', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app).get(`/v1/item/${item.id}`);
    expect(storedItem.status).toBe(200);
    expect(storedItem.body.status).toBe('ok');
    expect(storedItem.body.item).toEqual(item);
    expect(storedItem.body.item.id).toEqual(item.id);
  });

  test('Valid Item Tags should be an Array', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app).get(`/v1/item/${item.id}`);
    expect(Array.isArray(storedItem.body.item.tags)).toBe(true);
  });

  test('Valid Item should be an Object', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    const storedItem = await request(app).get(`/v1/item/${item.id}`);
    expect(typeof storedItem.body.item === 'object').toBe(true);
  });

  test('Invalid Item should return a Error JSON response', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });

    const storedItem = await request(app).get(`/v1/item/${item.id}`);
    expect(storedItem.status).toBe(404);
    expect(storedItem.body.status).toBe('error');

    expect(typeof storedItem.body.error === 'object').toBe(true);
    expect(storedItem.body.error.code).toEqual(404);
    expect(typeof storedItem.body.item === 'object').toBe(false);
  });
});
