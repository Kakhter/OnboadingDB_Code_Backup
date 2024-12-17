const express = require('express');
const router = express.Router();
const empMasterController = require('../controllers/empController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), empMasterController.createEmployee);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), empMasterController.getAllEmployees);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), empMasterController.getEmployeeById);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), empMasterController.updateEmployee);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), empMasterController.deleteEmployee);

module.exports = router;