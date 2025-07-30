const logger = require('../../../logger');
const container = require('./cdbClient');

async function writeItem(item) {
  logger.info({ item }, `Writing item into cosmosDB`);
  try {
    const res = await container.items.upsert(item);
    logger.info({ res }, `Successfully Wrote to CosmosDB item: `);
  } catch (e) {
    logger.warn({ e, item }, `error writing item to cosmosDB`);
    throw e;
  }
}

async function readItem(id) {
  logger.info({ id }, `Reading item ID from cosmosDB`);
  try {
    const res = await container.items.readItem(id);
    logger.info({ res }, `Successfully Read from CosmosDB item: `);
  } catch (e) {
    logger.warn({ e, id }, `error reading item id to cosmosDB`);
    throw e;
  }
}

async function deleteItem(id) {
  logger.info({ id }, `Deleting item ID from cosmosDB`);
  try {
    const res = await container.items.deleteItem(id);
    logger.info({ res }, `Successfully Deleted CosmosDB item: `);
  } catch (e) {
    logger.warn({ e, id }, `error deleting item id to cosmosDB`);
    throw e;
  }
}

async function listItems() {
  logger.info(`Listing items from cosmosDB`);
  try {
    const res = await container.items.readAll();
    logger.info({ res }, `Successfully Read CosmosDB items: `);
  } catch (e) {
    logger.warn({ e }, `error reading items from cosmosDB`);
    throw e;
  }
}

module.exports = { deleteItem, listItems, readItem, writeItem };
