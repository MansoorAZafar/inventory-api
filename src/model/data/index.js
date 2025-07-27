module.exports = process.env.AZURE_REGION ? require('./azure') : require('./memory');
