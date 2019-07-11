const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const listController = require('../controllers/list');

router.post('/add', auth, listController.addList);
router.delete('/remove', auth, listController.removeList);
router.put('/edit', auth, listController.editList);

module.exports = router;