const crypto = require('crypto');
/**
 * @param {string} email user's email address
 * @returns string Hashed email address
 */
const hash = (email) => {
  return crypto.createHash('sha256').update(email).digest('hex');
};

module.exports = hash;
