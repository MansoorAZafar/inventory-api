const express = require('express');
const logger = require('../logger');
const router = express.Router();
const { author, version } = require('../../package.json');
const { createSuccessResponse } = require('../response');

router.use('/v1', require('./api'));

const { hostname } = require('os');
/**
 * @description: A Simple server health check
 * @return {[res.status]} 200 if the server is ok, anything else if bad
 */
router.get('/', (req, res) => {
  logger.debug("User entered Route '/' ");
  res.setHeader('Cache-Control', 'no-cache');

  const data = {
    author,
    version,
    hostname: hostname(),
  };

  const success = createSuccessResponse(data);
  res.status(200).json(success);
});

module.exports = router;
