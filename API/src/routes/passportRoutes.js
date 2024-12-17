// routes/passportTranRoutes.js
const express = require('express');
const router = express.Router();
const passportTranController = require('../controllers/passportController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), passportTranController.createPassportTran);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), passportTranController.getAllPassportTrans);
router.get('/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), passportTranController.getPassportTranByUserId);
router.put('/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), passportTranController.updatePassportTranByUserId);
router.delete('/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), passportTranController.deletePassportTranByUserId);

module.exports = router;