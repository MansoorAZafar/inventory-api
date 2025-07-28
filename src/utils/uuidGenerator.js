const crypto = require('crypto');

function uuidGenerator() {
  const uuid = crypto.randomUUID();
  return uuid;
}

module.exports = uuidGenerator;
