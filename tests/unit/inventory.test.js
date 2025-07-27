const { Inventory } = require('../../src/model/Inventory');

describe('Inventory Model Tests', () => {
  test('Making Item that is NOT item type', async () => {
    const inventory = new Inventory();
    expect(() => {
      inventory.createItem('should throw erorr');
    }).toThrow('Can only add typeof Items');
  });
});
