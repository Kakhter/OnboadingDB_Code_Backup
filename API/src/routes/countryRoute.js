
// routes/countryMasterRoutes.js
const express = require('express');
const router = express.Router();
const countryMasterController = require('../controllers/countryController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

// Define routes
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.createCountry);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.getAllCountries);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.getCountryById);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.updateCountry);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.deleteCountry);
router.get('/getNationalityByID/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), countryMasterController.getNationalityById);
module.exports = router;
