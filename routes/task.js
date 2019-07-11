const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/task');

router.post('/add', auth, taskController.addTask);
router.delete('/remove', auth, taskController.removeTask);
router.put('/move', auth, taskController.moveTaskToOtherList);
router.put('/starred', auth, taskController.setOrRemoveStarred);
router.put('/comment', auth, taskController.changeComment);

module.exports = router;