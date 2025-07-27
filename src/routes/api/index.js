const express = require('express');
const router = express.Router();
// const logger = require('../../logger');

router.get('/item/:id', require('./get/getItemById'));

module.exports = router;
