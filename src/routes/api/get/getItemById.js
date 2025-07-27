const logger = require('../../../logger');

const getItemById = async (_req, res) => {
  logger.debug('calling getItemById()');
  res.send('Hello World');
};

module.exports = getItemById;
