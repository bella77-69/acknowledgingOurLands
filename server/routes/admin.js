const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.use(auth, admin);

router.get('/users', adminController.getUsers);
router.get('/activities', adminController.getAllActivities);
router.get('/activities/user/:userId', adminController.getUserActivity);
router.get('/stats', adminController.getStats);
router.patch('/users/:userId/status', adminController.updateUserStatus);
router.delete('/users/:userId', adminController.deleteUser);

module.exports = router;