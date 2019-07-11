const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/task');

router.post('/new', auth, taskController.createTask);
router.delete('/:taskId', auth, taskController.deleteTask);
router.put('/:taskId', auth, taskController.updateTask);
router.put('/:taskId/move', auth, taskController.moveToOtherList);

module.exports = router;