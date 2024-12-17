const express = require('express');
const userController = require('../controllers/userController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Public route
router.post('/login', userController.login);
router.post('/sendForgetCode', userController.sendForgetCode);


// Route to send random code via email
router.get('/getUserFormsDetails/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), userController.getUserFormsDetails);
router.get('/fetchALlActiveUser', authorizeRoles([2, 3]), isPasswordChanged(), userController.fetchALlActiveUser);
router.get('/getUserByUserID/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), userController.getUserByUserID);
router.get('/fetchTheUserWhoIsFiledThePreOnboardingForm', authorizeRoles([1, 2]), isPasswordChanged(), userController.fetchTheUserWhoIsFilledThePreOnboardinForm);
router.post('/sendcode', authorizeRoles([2, 3]), isPasswordChanged(), upload.single('DocScanned'), userController.sendCode);
router.post('/logout', authorizeRoles([1, 2, 3]), isPasswordChanged(), userController.logout);
router.post('/changePassword', authorizeRoles([1, 2, 3]), userController.changePassword);
//new added by Khalid to get the candidate 
router.get('/getUserPhoto/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), userController.getUserPhoto);
module.exports = router;
