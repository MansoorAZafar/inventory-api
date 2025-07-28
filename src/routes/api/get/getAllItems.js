const { Inventory } = require('../../../model');
const { createSuccessResponse } = require('../../../response');
const logger = require('../../../logger');

const getAllItems = async (_req, res) => {
  logger.info('Entered /items');
  const storedItems = await Inventory.get();
  const success = createSuccessResponse({ items: storedItems });

  return res.status(200).json(success);
};

module.exports = getAllItems;
