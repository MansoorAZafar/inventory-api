const BearerStrategy = require('passport-http-bearer');
const authorize = require('./auth-middleware');
const admin = require('firebase-admin');
const logger = require('../logger');

// await admin.auth().verifyIdToken(token);
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(`missing expected env vars: FIREBASE_SERVICE_ACCOUNT`);
}
logger.info(`using Firebase Auth`);

module.exports.strategy = () =>
  new BearerStrategy(async (token, done) => {
    try {
      const user = await admin.auth().verifyIdToken(token);
      logger.debug({ user }, `verified user token`);

      done(null, user.email);
    } catch (e) {
      logger.error({ e, token }, `could not verify token`);
      done(null, false);
    }
  });

module.exports.authenticate = () => authorize('bearer');
