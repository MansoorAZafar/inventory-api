const { Inventory } = require('../../src/model/Inventory');
const { Item } = require('../../src/model/item');

describe('Inventory Model Tests', () => {
  test('Making Item that is NOT item type', async () => {
    expect(
      async () =>
        await Inventory.save('should throw error').reject.toThrow('Can only add typeof Items')
    );
  });

  test('creating an item should be saved in the db', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);
    expect(await Inventory.byId(item.id)).toStrictEqual(item);

    await Inventory.deleteItem(item.id);
  });

  test('creating multiple items should be saved in db', async () => {
    const items = [
      new Item({ name: 'water', price: 1.25, quantity: 2 }),
      new Item({ name: 'chips', price: 2.23, quantity: 12 }),
      new Item({ name: 'bread', price: 3, quantity: 0 }),
    ];

    items.forEach(async (item) => {
      await Inventory.save(item);
      const storedItem = await Inventory.byId(item.id);
      expect(storedItem).toStrictEqual(item);

      await Inventory.deleteItem(item.id);
    });
  });

  test('byId() should return an instance of Item', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);
    const storedItem = await Inventory.byId(item.id);
    expect(storedItem).toStrictEqual(item);
    expect(storedItem instanceof Item).toBe(true);

    await Inventory.deleteItem(item.id);
  });

  test('byId() with invalid ID should throw', async () => {
    const item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    expect(async () => await Inventory.byId(item.id).toThrow());
  });

  test('get() should return all items', async () => {
    const items = [
      new Item({ name: 'water', price: 1.25, quantity: 2 }),
      new Item({ name: 'chips', price: 2.23, quantity: 12 }),
      new Item({ name: 'bread', price: 3, quantity: 0 }),
    ];

    items.forEach(async (item) => {
      await Inventory.save(item);
    });

    const allItems = await Inventory.get();
    expect(allItems.length === items.length).toBe(true);
    expect(Array.isArray(allItems)).toBe(true);

    for (let i = 0; i < allItems.length; ++i) {
      expect(allItems[i]).toStrictEqual(items[i]);
      await Inventory.deleteItem(allItems[i].id);
    }
  });

  test('get() with nothing should return empty array', async () => {
    const allItems = await Inventory.get();
    expect(Array.isArray(allItems)).toBe(true);
    expect(allItems.length).toEqual(0);
  });

  test('update() should update a property', async () => {
    let item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    await Inventory.save(item);
    expect(await Inventory.byId(item.id)).toStrictEqual(item);

    item['price'] = 22.25;
    item.description = 'hello world';

    await Inventory.update(item.id, item);
    const storedItem = await Inventory.byId(item.id);

    expect(storedItem).toStrictEqual(item);
    expect(storedItem.description).toEqual(item.description);
    expect(storedItem.price).toEqual(item.price);

    await Inventory.deleteItem(item.id);
  });

  test('update() invalid id should throw', async () => {
    let item = new Item({ name: 'water', price: 1.25, quantity: 2 });
    item.description = "this isn't saved in db, should throw";

    expect(async () => await Inventory.update(item.id, item).toThrow());
  });
});
