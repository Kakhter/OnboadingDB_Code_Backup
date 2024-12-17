
const express = require('express');
const levelController = require('../controllers/levelController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new level
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), levelController.createLevel);

// Get all levels
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), levelController.getAllLevels);

// Get level by ID
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), levelController.getLevelById);

// Update level
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), levelController.updateLevel);

// Delete level
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), levelController.deleteLevel);

module.exports = router;
