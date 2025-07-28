const { randomUUID } = require('crypto');
const DEFAULT_IMG_URL = 'https://dummyimage.com/640x4:3/';
const DEFAULT_TAGS = ['item'];
const DEFAULT_DESCRIPTION = 'item default desc';

class Item {
  constructor({ id, name, price, description, quantity, tags, imgURL }) {
    if (!name || !price || (quantity != 0 && !quantity))
      throw new Error('name, price and quantity are required');
    if (quantity < 0) throw new Error('cannot have less than 0 items');

    this.id = id || randomUUID();
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description || DEFAULT_DESCRIPTION;
    this.tags = tags || DEFAULT_TAGS;
    this.imgURL = imgURL || DEFAULT_IMG_URL;
  }
}

module.exports.Item = Item;
