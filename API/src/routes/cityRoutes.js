
const express = require('express');
const cityController = require('../controllers/cityController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new city
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), cityController.createCity);

// Get all cities
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), cityController.getAllCities);

// IMP -- Get cities by country ID
// router.get('/country/:countryId', cityController.getCitiesByCountryId);

router.put('/:cityId', authorizeRoles([1, 2, 3]), isPasswordChanged(), cityController.updateCity);

//search city according to the state
router.get('/state/:stateId', authorizeRoles([1, 2, 3]), isPasswordChanged(), cityController.getCitiesByStateId);


module.exports = router;
