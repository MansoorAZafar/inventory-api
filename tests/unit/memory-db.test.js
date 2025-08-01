// Fix this path to point to your project's `memory-db.js` source file
const MemoryDB = require('../../src/model/data/memory/memory-db');

describe('memory-db', () => {
  let db;

  // Each test will get its own, empty database instance
  beforeEach(() => {
    db = new MemoryDB();
  });

  test('put() returns nothing', async () => {
    const result = await db.put('a', {});
    expect(result).toBe(undefined);
  });

  test('get() returns what we put() into the db', async () => {
    const data = { value: 123 };
    await db.put('a', data);
    const result = await db.get('a');
    expect(result).toEqual(data);
  });

  test('put() and get() work with Buffers', async () => {
    const data = Buffer.from([1, 2, 3]);
    await db.put('a', data);
    const result = await db.get('a');
    expect(result).toEqual(data);
  });

  test('get() with incorrect Key returns nothing', async () => {
    await db.put('a', 123);
    const result = await db.get('e');
    expect(result).toBe(undefined);
  });

  test('query() returns all values', async () => {
    await db.put('a', { value: 1 });
    await db.put('b', { value: 2 });
    await db.put('c', { value: 3 });

    const results = await db.query();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  test('query() returns empty array', async () => {
    const results = await db.query();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toEqual([]);
  });

  test('del() removes value put() into db', async () => {
    await db.put('a', { value: 1 });
    expect(await db.get('a')).toEqual({ value: 1 });
    await db.del('a');
    expect(await db.get('a')).toBe(undefined);
  });

  test('del() throws if primaryKey and secondaryKey not in db', () => {
    expect(() => db.del('a')).rejects.toThrow();
  });

  test('get() expects string keys', () => {
    expect(async () => await db.get()).rejects.toThrow();
    expect(async () => await db.get(1)).rejects.toThrow();
  });

  test('put() expects string keys', () => {
    expect(async () => await db.put()).rejects.toThrow();
    expect(async () => await db.put(1)).rejects.toThrow();
  });

  test('del() expects string keys', () => {
    expect(async () => await db.del()).rejects.toThrow();
    expect(async () => await db.del(1)).rejects.toThrow();
  });
});
