const express = require('express');
const router = express.Router();
const models = require('../models');
const auth = require('../middleware/auth');
const listController = require('../controllers/list');

router.post('/add', auth.ensureAuth, listController.addList);

module.exports = router;