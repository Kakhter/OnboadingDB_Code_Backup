const express = require('express');
const eventTypeMasterController = require('../controllers/eventTypeMasterController');
const router = express.Router();
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');


router.post('/add', authorizeRoles([2]), isPasswordChanged(), eventTypeMasterController.createEventType);
router.get('/', authorizeRoles([2]), isPasswordChanged(), eventTypeMasterController.getAllEventTypes);
router.get('/:id', authorizeRoles([2]), isPasswordChanged(), eventTypeMasterController.getEventTypeById);
router.put('/:id', authorizeRoles([2]), isPasswordChanged(), eventTypeMasterController.updateEventType);
router.delete('/:id', authorizeRoles([2]), isPasswordChanged(), eventTypeMasterController.deleteEventType);

module.exports = router;
