if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.HTPASSWD_FILE) {
  throw new Error(
    `env contains configuration for both Firebase and HTTP Basic Auth. Only 1 is allowed`
  );
}

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  module.exports = require('./firebase-auth');
} else if (process.env.HTPASSWD_FILE && process.NODE_ENV !== 'production') {
  module.exports = require('./basic-auth');
} else {
  throw new Error('missing env vars: no authorization configuration found');
}
