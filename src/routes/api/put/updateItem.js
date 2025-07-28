const logger = require('../../../logger');
const { Inventory, Item } = require('../../../model');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

const updateItem = async (req, res) => {
  //
  logger.info('Entered PUT /item/:id');
  const id = req.params.id;
  try {
    const item = new Item(req.body);
    if (item.id !== id) throw new Error('Cannot change item ID!');

    await Inventory.update(id, item);
  } catch (e) {
    logger.warn(`Failed to update Item: ${id}: ${e.message}`);
    const error = createErrorResponse(404, `Failed to update Item: ${id}: ${e.message}`);
    return res.status(404).json(error);
  }

  const success = createSuccessResponse({ id });
  return res.status(200).json(success);
};

module.exports = updateItem;
