const express = require('express');
const router = express.Router();
const documentTranController = require('../controllers/documentTranController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

// Define routes
router.post('/add', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.createDocumentTran);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.updateDocumentTran);
router.get('/getDocumentTranByUserId/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.getDocumentTranByUserId);
router.get('/getDocumentTranByUserAsPerTheDocType/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.getDocumentTranByUserAsPerTheDocType);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.getAllDocumentTrans);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.getDocumentTranById);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTranController.deleteDocumentTran);


module.exports = router;
