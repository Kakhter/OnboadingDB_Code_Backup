const userFormController= require('../controllers/userFormsController');
const express = require('express');
const router = express.Router();
 
router.get('/',userFormController.getAll);
router.put('/markallsubmitted/:id',userFormController.markAsSubmitted);  ////
router.put('/markaccepted/:id',userFormController.markAccepted);
router.put('/markrejected/:id',userFormController.markRejected);
router.get('/getacceptedusers',userFormController.getAllAccepted);
router.get('/getPersonalDetailByID',userFormController.getPersonalDetailByID);
 
module.exports = router;