const express = require('express');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();
const visaTranController = require('../controllers/visaTranController');
router.get('/passport/:passportId', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.getVisaTransByPassportId);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.getAllVisaTrans);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.getVisaTranById);
router.post('/add', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.createVisaTran);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.updateVisaTran);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), visaTranController.deleteVisaTran);

module.exports = router;
