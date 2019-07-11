const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/task');

router.post('/:listId/add', auth, taskController.addTask);
router.delete('/:listId/remove', auth, taskController.removeTask);
router.put('/:listId/move', auth, taskController.moveTaskToOtherList);
router.put('/:listId/starred', auth, taskController.setOrRemoveStarred);
router.put('/:listId/comment', auth, taskController.changeComment);
router.put('/:listId/due', auth, taskController.setDueDate);

module.exports = router;