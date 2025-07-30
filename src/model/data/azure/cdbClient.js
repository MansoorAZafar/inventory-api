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
    return credentials;
  }
  logger.warn('Credentials Not Set');
  return {};
};

const getClient = () => {
  const credentials = getCredentials();
  const cdbClient = new CosmosClient(credentials);

  const database = cdbClient.database('');
  const container = database.container('');

  return container;
};

// const {container} = await database
module.exports = getClient();
