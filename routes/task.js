const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/task');

router.post('/add', auth, taskController.addTask);

module.exports = router;