const MemoryDB = require('./memory-db');
const data = new MemoryDB();

async function writeItem(item) {
  const serialized = JSON.stringify(item);
  return await data.put(item.id, serialized);
}

async function readItem(id) {
  const serialized = await data.get(id);
  return typeof serialized === 'string' ? JSON.parse(serialized) : serialized;
}

async function listItems() {
  const items = await data.query();
  const parsedItems = items.map((item) => JSON.parse(item));

  return parsedItems;
}

async function deleteItem(id) {
  return Promise.resolve(await data.del(id));
}

// module.exports.deleteItem = deleteItem;
// module.exports.listItems = listItems;
// module.exports.readItem = readItem;
// module.exports.writeItem = writeItem;

module.exports = { deleteItem, listItems, readItem, writeItem };
