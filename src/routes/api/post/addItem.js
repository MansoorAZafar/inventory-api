const logger = require('../../../logger');
const { Inventory, Item } = require('../../../model');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

const addItem = async (req, res) => {
  logger.info('Entered POST /item');

  let itemId;
  try {
    const item = new Item(req.body);
    itemId = item.id;

    await Inventory.save(item);
  } catch (e) {
    logger.warn(`creating item failed: ${req.body} : ${e.message}`);

    const error = createErrorResponse(
      404,
      `creating item failed: ${req.body} : ${e.message}`
    );
    return res.status(404).json(error);
  }

  const success = createSuccessResponse({ id: itemId });
  return res.status(200).json(success);
};

module.exports = addItem;
