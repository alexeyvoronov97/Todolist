const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const listController = require('../controllers/list');
const taskController = require('../controllers/task');

router.get('/', auth, listController.getAllLists);
router.post('/add', auth, listController.addList);
router.delete('/remove', auth, listController.removeList);
router.put('/edit', auth, listController.editList);
router.get('/starred', auth, taskController.getStarredTasks);
router.get('/today', auth, taskController.getTodayTasks);
router.get('/week', auth, taskController.getWeekTasks);

module.exports = router;