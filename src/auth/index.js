if (process.env.AZURE_POOL_ID && process.env.HTPASSWD_FILE) {
  throw new Error(
    `env contains configuration for both Azure and HTTP Basic Auth. Only 1 is allowed`
  );
}

if (process.env.AZURE_POOL_ID) {
  module.exports = require('./azure_ad');
} else if (process.env.HTPASSWD_FILE && process.NODE_ENV !== 'production') {
  module.exports = require('./basic-auth');
} else {
  throw new Error('missing env vars: no authorization configuration found');
}
