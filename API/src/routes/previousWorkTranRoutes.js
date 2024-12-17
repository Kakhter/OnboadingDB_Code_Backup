const express = require('express');
const router = express.Router();
const previousWorkController = require('../controllers/previousWorkController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.create);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.findAll);
router.get('/getallpreviousworkbyuserid/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.findByUserId);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.findOne);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.update);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousWorkController.delete);

module.exports = router;