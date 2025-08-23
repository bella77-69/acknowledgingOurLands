const express = require('express');
const acknowledgmentController = require('../controllers/acknowledgmentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, acknowledgmentController.createAcknowledgment);
router.get('/my', auth, acknowledgmentController.getUserAcknowledgment);
router.get('/my/stats', auth, acknowledgmentController.getUserStats);
router.get('/public', acknowledgmentController.getPublicAcknowledgment);
router.put('/:id', auth, acknowledgmentController.updateAcknowledgment);
router.delete('/:id', auth, acknowledgmentController.deleteAcknowledgment);

module.exports = router;