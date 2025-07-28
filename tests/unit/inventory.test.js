const { Inventory } = require('../../src/model/Inventory');
const { Item } = require('../../src/model/item');
const { uuidGenerator } = require('../../src/utils');

describe('Inventory Model Tests', () => {
  test('Making Item that is NOT item type', async () => {
    expect(
      async () =>
        await Inventory.save('should throw error').reject.toThrow('Can only add typeof Items')
    );
  });

  test('creating an item should be saved in the db', async () => {
    const item = new Item(uuidGenerator(), 'water', 1.25);
    await Inventory.save(item);
    expect(await Inventory.byId(item.id)).toBe(item);

    await Inventory.deleteItem(item.id);
  });

  test('creating multiple items should be saved in db', async () => {
    const items = [
      new Item({ id: uuidGenerator(), name: 'water', price: 1.25 }),
      new Item(uuidGenerator(), 'rocks', 5),
      new Item(uuidGenerator(), 'chips', 0.23),
    ];

    items.forEach(async (item) => {
      await Inventory.save(item);
      const storedItem = await Inventory.byId(item.id);
      expect(storedItem).toEqual(item);

      await Inventory.deleteItem(item.id);
    });
  });
});
