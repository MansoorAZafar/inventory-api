const express = require('express');
const router = express.Router();
// const logger = require('../../logger');

// GET
router.get('/item/:id', require('./get/getItemById'));
router.get('/items', require('./get/getAllItems'));

// POST
router.post('/item', express.json(), require('./post/addItem'));

// PUT
router.put('/item/:id', express.json(), require('./put/updateItem'));

// DELETE
router.delete('/item/:id', require('./delete/deleteItem'));

module.exports = router;
