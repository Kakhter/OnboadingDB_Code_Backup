
const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

// Define routes
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), educationController.createEducation); // Create a new education record
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), educationController.getAllEducation); // Get all education records
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), educationController.getEducationById); // Get a single education record by ID
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), educationController.updateEducation); // Update an education record by ID
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), educationController.deleteEducation); // Delete an education record by ID


router.get('/getbyuser/:userId', educationController.getEducationByUserId);
module.exports = router;
