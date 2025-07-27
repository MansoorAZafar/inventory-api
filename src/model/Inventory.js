const { Item } = require('./item');

class Inventory {
  createItem(item) {
    if (typeof item !== Item) throw new Error('Can only add typeof Items');
    // TODO: Add to DB
  }

  byId(id) {
    id;
    //TODO: Read item from DB matching ID
  }

  get() {
    //TODO: Return ALL items from DB
  }

  byTag(tag) {
    tag;
    // TODO: Read items from DB Matching TAG
  }

  deleteItem(id) {
    id;
    // TODO: Delete item from DB if match Id
  }

  updateItem(id, content) {
    id;
    content;
    // TODO: Update item X with content
  }
}

module.exports.Inventory = Inventory;
