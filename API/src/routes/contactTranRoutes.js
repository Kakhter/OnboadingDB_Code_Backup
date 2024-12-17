

const express = require('express');
const contactTranController = require('../controllers/contactTranController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), contactTranController.createContact);


router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), contactTranController.getAllContacts);


router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), contactTranController.getContactById);


router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), contactTranController.updateContact);


router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), contactTranController.deleteContact);

module.exports = router;
