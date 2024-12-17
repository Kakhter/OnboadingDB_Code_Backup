
const express = require('express');
const degreeController = require('../controllers/degreeController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new degree
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), degreeController.createDegree);

// Get all degrees
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), degreeController.getAllDegrees);

// Get degree by ID
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), degreeController.getDegreeById);

// Update degree
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), degreeController.updateDegree);

// Delete degree
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), degreeController.deleteDegree);

module.exports = router;
