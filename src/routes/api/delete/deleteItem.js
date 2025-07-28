const logger = require('../../../logger');
const { Inventory } = require('../../../model');
const { createErrorResponse, createSuccessResponse } = require('../../../response');

const deleteItem = async (req, res) => {
  logger.info('Entered DELETE /item/id');
  const id = req.params.id;

  try {
    await Inventory.deleteItem(id);
  } catch (e) {
    logger.warn(`Item ID: ${id} can't be deleted, probably because it doesn't exist...`);
    const error = createErrorResponse(404, `Deletion of Item ID: ${id} failed: ${e.message}`);
    return res.status(404).json(error);
  }

  const success = createSuccessResponse();
  return res.status(200).json(success);
};

module.exports = deleteItem;
