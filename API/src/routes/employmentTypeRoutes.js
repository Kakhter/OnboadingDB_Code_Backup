const express = require('express');
const router = express.Router();
const EmploymentTypeController = require('../controllers/employementTypeController'); // Adjust the path as needed
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

// Create a new EmploymentType
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), EmploymentTypeController.createEmploymentType);

// Get all EmploymentTypes
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), EmploymentTypeController.getAllEmploymentTypes);

// Get a single EmploymentType by ID
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), EmploymentTypeController.getEmploymentTypeById);

// Update an EmploymentType by ID
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), EmploymentTypeController.updateEmploymentTypeById);

// Delete an EmploymentType by ID
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), EmploymentTypeController.deleteEmploymentTypeById);

module.exports = router;

