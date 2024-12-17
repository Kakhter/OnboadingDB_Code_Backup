// routes/personalDetailsRoutes.js
const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetailsController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.get('/fetchTheUserWhoSubmittedThePersonalDetails', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.fetchTheUserWhoSubmittedThePersonalDetails);
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.createPersonalDetails);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.getAllPersonalDetails);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.getPersonalDetailsByUserId);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.updatePersonalDetailsByUserId);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), personalDetailsController.deletePersonalDetailsByUserId);

module.exports = router;

