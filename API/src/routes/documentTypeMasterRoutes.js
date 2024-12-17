const express = require('express');
const router = express.Router();
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const documentTypeController = require('../controllers/documentTypeMasterController');

// Define routes
router.post('/add', authorizeRoles([2, 3]), isPasswordChanged(), documentTypeController.createDocumentType);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTypeController.getAllDocumentTypes);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), documentTypeController.getDocumentTypeById);
router.put('/:id', authorizeRoles([2, 3]), isPasswordChanged(), documentTypeController.updateDocumentType);
router.delete('/:id', authorizeRoles([2, 3]), isPasswordChanged(), documentTypeController.deleteDocumentType);

module.exports = router;
