const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateTranController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.createCertificate);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.getCertificates);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.getCertificateById);
router.get('/getCertificateByUserId/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.getCertificateByUserId);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.updateCertificate);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), certificateController.deleteCertificate);
module.exports = router;