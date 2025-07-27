const { randomUUID } = require('crypto');

class Item {
  constructor({ id, name, price, description, quantity, tags }) {
    if (!name || !price || !quantity) throw new Error('name, price and quantity are required');
    if (quantity < 0) throw new Error('cannot have less than 0 items');

    this.id = id || randomUUID();
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
    this.tags = tags;
  }
}

module.exports.Item = Item;
