require('dotenv').config();
const logger = require('./logger');

process.on('uncaughtException', (err, origin) => {
  logger.fatal({ err, origin }, 'Uncaught exception ');
  throw err;
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'Unhandled Rejection');
  throw promise;
});

require('./server');
