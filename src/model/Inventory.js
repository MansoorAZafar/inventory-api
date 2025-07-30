const { Item } = require('./item');

const { writeItem, readItem, listItems, deleteItem } = require('./data');

class Inventory {
  /**
   * Saves an item into the DB
   * @param {Item} item
   * @returns {Promise<any>}
   */
  static async save(item) {
    if (!(item instanceof Item)) throw new Error('Can only add typeof Items');
    // TODO: Add to DB
    await writeItem(item);
    return Promise.resolve();
  }

  /**
   * Gets a Item from the DB  for the given id
   * @param {string} id
   * @returns {Promise<Item>}
   */
  static async byId(id) {
    const storedItem = await readItem(id);
    const item = new Item(storedItem);
    return Promise.resolve(item);
  }

  /**
   * Gets all values from the DB
   * @returns {Promise<Item[]>}
   */
  static async get() {
    const items = await listItems();
    let storedItems = [];
    if (items) {
      storedItems = items.map((item) => new Item(item));
    }
    return Promise.resolve(storedItems);
  }

  /**
   * Deletes the item from the DB
   * @param {string} id
   * @returns {Promise<any>}
   */
  static async deleteItem(id) {
    return await deleteItem(id);
  }

  /**
   * Updates the item in the DB
   *
   * @param {string} id
   * @param {Item} content
   * @returns {Promise<any>}
   */
  static async update(id, content) {
    return await writeItem({ id, ...content });
  }
}

module.exports.Inventory = Inventory;
