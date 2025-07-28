const logger = require('../../../logger');
const { Inventory } = require('../../../model/Inventory');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

const getItemById = async (req, res) => {
  logger.debug('calling getItemById()');
  const id = req.params.id;
  let storedItem;
  try {
    storedItem = await Inventory.byId(id);
  } catch (e) {
    logger.warn(`Invalid Item ID: ${id}`);
    const error = createErrorResponse(404, `Invalid Item ID: ${id}: ${e.message}`);
    return res.status(404).json(error);
  }

  const success = createSuccessResponse({ item: storedItem });
  return res.status(200).json(success);
};

module.exports = getItemById;
