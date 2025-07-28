const { Item } = require('./item');
// eslint-disable-next-line no-unused-vars
const { writeItem, readItem, listItems, deleteItem } = require('./data');

class Inventory {
  static async save(item) {
    if (typeof item !== Item) throw new Error('Can only add typeof Items');
    // TODO: Add to DB
    await writeItem(item.id, item);
    return Promise.resolve();
  }

  static async byId(id) {
    const item = await readItem(id);
    return Promise.resolve(item);
  }

  static async get() {
    //TODO: Return ALL items from DB
  }

  static async byTag(tag) {
    tag;
    // TODO: Read items from DB Matching TAG
  }

  static async deleteItem(id) {
    return await deleteItem(id);
  }

  static async updateItem(id, content) {
    id;
    content;
    // TODO: Update item X with content
  }
}

module.exports.Inventory = Inventory;
