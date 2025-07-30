const { CosmosClient } = require('@azure/cosmos');
const logger = require('../../../logger');

const getCredentials = () => {
  if (process.env.COSMOSDB_PRIMARY_KEY && process.env.COSMOSDB_ENDPOINT) {
    const credentials = {
      key: process.env.COSMOSDB_PRIMARY_KEY,
      endpoint: process.env.COSMOSDB_ENDPOINT,
      connectionPolicy: {
        requestTimeout: 10000,
      },
    };
    logger.debug('Credentials Set');
    return credentials;
  }
  logger.warn('Credentials Not Set');
  return {};
};

const getClient = () => {
  const credentials = getCredentials();
  const cdbClient = new CosmosClient(credentials);
  logger.debug('cosmos client initialized');

  const database = cdbClient.database(process.env.COSMOSDB_DATABASE);
  const container = database.container(process.env.COSMOSDB_CONTAINER);

  return container;
};

logger.info('using azure cosmosDB');

// const {container} = await database
// module.exports = getClient();
module.exports = getClient();
