const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const listController = require('../controllers/list');

router.post('/add', auth, listController.addList);

module.exports = router;