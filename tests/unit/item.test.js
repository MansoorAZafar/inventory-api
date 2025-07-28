const { Item } = require('../../src/model/item');

describe('Testing Item Class', () => {
  test('Cannot make item without a name', () => {
    expect(() =>
      new Item({ price: 0, quantity: 1 }).toThrow('name, price and quantity are required')
    );
  });

  test('Cannot make item without a price', () => {
    expect(() =>
      new Item({ name: 'hi', quantity: 1 }).toThrow('name, price and quantity are required')
    );
  });

  test('Cannot make item without a quantity', () => {
    expect(() =>
      new Item({ price: 0, name: 'bob' }).toThrow('name, price and quantity are required')
    );
  });

  test('Cannot make item with a quantity < 0', () => {
    expect(() =>
      new Item({ price: 0, quantity: -1, name: 'hi' }).toThrow('cannot have less than 0 items')
    );
  });

  test('Can make an item with ONLY name, price, quantity', () => {
    const item = new Item({ name: 'water', price: 2.25, quantity: 3 });
    expect(item.name).toBe('water');
    expect(item.price).toBe(2.25);
    expect(item.quantity).toBe(3);
  });

  test('Item other properties should have default value', () => {
    const item = new Item({ name: 'water', price: 2.25, quantity: 3 });
    expect(item.name).toBe('water');
    expect(item.price).toBe(2.25);
    expect(item.quantity).toBe(3);
    expect(item.id).toBeDefined();
    expect(item.description).toBeDefined();
    expect(item.imgURL).toBeDefined();
    expect(item.tags).toBeDefined();
  });

  test('Item default tags should be array', () => {
    const item = new Item({ name: 'water', price: 2.25, quantity: 3 });
    expect(Array.isArray(item.tags)).toBe(true);
  });

  test('Item price must be a number', () => {
    expect(() => new Item({ name: 'hi', price: 'no', quantity: 12 }).toThrow());
  });

  test('Item quantity must be a number', () => {
    expect(() => new Item({ name: 'hi', price: 2.5, quantity: 'hehe' }).toThrow());
  });
});
