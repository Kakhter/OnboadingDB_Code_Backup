const express = require('express');
const multer = require('multer');
const PreOnBoardingUserController = require('../controllers/preOnboardingUsersController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get('/getall', PreOnBoardingUserController.getallUsers);
router.post('/create-single', PreOnBoardingUserController.createSingleEntry);
router.post('/create-batch', upload.single('file'), PreOnBoardingUserController.createBatchFromExcel);
router.put('/update/:id',PreOnBoardingUserController.updateUser);

module.exports = router;
