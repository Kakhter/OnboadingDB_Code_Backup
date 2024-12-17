
const express = require('express');
const stateController = require('../controllers/stateController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new state
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.createState);

// Get all states
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.getAllStates);

// Get a specific state by ID
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.getStateById);

// Update a state
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.updateState);

//IMPORTANT
router.get('/country/:countryId', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.getStatesByCountryId);

// Delete a state
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), stateController.deleteState);

module.exports = router;
