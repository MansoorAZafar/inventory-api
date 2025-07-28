const request = require('supertest');
const app = require('../../src/app');
const { Inventory, Item } = require('../../src/model');

describe('Testing DELETE /item route', () => {
  test('deleting non-existent item should return Error', async () => {
    const res = await request(app).delete('/v1/item/123');

    expect(res.status).toBe(404);
    expect(typeof res.body.error === 'object').toBe(true);
    expect(res.body.status).toBe('error');
    expect(res.body.error.code).toBe(404);
    expect(res.body.error.message).toBeDefined();
  });

  test('deleting item should remove it from db', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);

    let res = await request(app).delete(`/v1/item/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');

    res = await request(app).get(`/v1/item/${item.id}`);
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');

    expect(typeof res.body.error === 'object').toBe(true);
    expect(res.body.error.code).toEqual(404);
    expect(typeof res.body.item === 'object').toBe(false);

    expect(async () => await Inventory.byId(item.id).toThrow());
  });
});
