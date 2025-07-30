module.exports = process.env.COSMOSDB_ENDPOINT
  ? require('./azure')
  : require('./memory');
