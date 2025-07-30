const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const passport = require('passport');
const authenticate = require('./auth');
const helm = require('helmet');
const admin = require('firebase-admin');

const { createErrorResponse } = require('./response');

const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccount = require(serviceAccountPath);

const logger = require('./logger');
const pino = require('pino-http')({
  logger,
});

const app = express();
app.use(pino);
app.use(compression());
app.use(helm());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

passport.use(authenticate.strategy());
app.use(passport.initialize());

/**
 * @description: A Simple server health check
 * @return {[res.status]} 200 if the server is ok, anything else if bad
 */
app.use('/', require('./routes'));

// 404 middleware to handle any requests for resources that can't be found
/**
 * @description: 404 middleware to handle any request for not found resources
 * @returns {[res.status(404)]} 404 error response
 */
app.use((req, res) => {
  logger.debug(`User went to 404 Middleware`);

  const errorCode = 404;
  const errorMsg = 'resource not found';
  const error = createErrorResponse(errorCode, errorMsg);

  res.status(404).json(error);
});

/**
 * @description Error handling middleware for anything else
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'unable to process request';
  const error = createErrorResponse(status, message);

  // If server error: Log it
  if (status > 409) {
    logger.error({ err }, 'Error processing request');
  }

  res.status(status).json(error);
});

//Export the application to be used in server.js
module.exports = app;
