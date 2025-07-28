const { writeItem, readItem, listItems, deleteItem } = require('../../src/model/data/memory/index');
const { uuidGenerator } = require('../../src/utils');

describe('UniqueID', () => {
  test('uniqueID should never give the same ID', () => {
    const numTests = 50;
    for (let i = 0; i < numTests; ++i) {
      expect(uuidGenerator()).not.toEqual(uuidGenerator());
    }
  });
});

describe('MemoryDB Item Functions', () => {
  const items = [
    { id: uuidGenerator(), name: 'water' },
    { id: uuidGenerator(), name: 'wd40' },
  ];

  beforeEach(async () => {
    await writeItem(items[0]);
    await writeItem(items[1]);
  });

  test('writeItem should store data to db', async () => {
    const item = { id: uuidGenerator(), name: 'apple' };

    await writeItem(item);
    const storedItem = await readItem(item.id);

    expect(storedItem).toEqual(item);
    deleteItem(item.id);
  });

  test('listItems should list all items', async () => {
    const storedItems = await listItems();
    expect(Array.isArray(storedItems)).toBe(true);
    expect(storedItems).toEqual(items);
  });

  test('deleteItem should delete item', async () => {
    const item = { id: uuidGenerator(), name: 'to be deleted' };
    await writeItem(item);

    let storedItem = await readItem(item.id);
    expect(storedItem).toEqual(item);

    await deleteItem(item.id);
    storedItem = await readItem(item.id);
    expect(storedItem).toEqual(undefined);
  });

  test('deleting non-existent item should not throw', async () => {
    const item = { id: uuidGenerator(), name: 'to be deleted' };
    expect(async () => await deleteItem(item.id).reject.toThrow());

    const storedItem = await readItem(item.id);
    expect(storedItem).toEqual(undefined);
  });
});
