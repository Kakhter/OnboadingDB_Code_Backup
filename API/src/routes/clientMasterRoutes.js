const express = require('express');
const router = express.Router();
const clientMasterController = require('../controllers/clientMasterController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), clientMasterController.getAllClients);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), clientMasterController.getClientById);
router.post('/add', authorizeRoles([1, 2, 3]), isPasswordChanged(), clientMasterController.createClient);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), clientMasterController.updateClient);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), clientMasterController.deleteClient);

module.exports = router;
