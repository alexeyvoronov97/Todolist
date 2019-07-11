const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/list');

router.post('/add', auth, controller.addList);
router.delete('/remove', auth, controller.removeList);
router.put('/edit', auth, controller.editList);

module.exports = router;