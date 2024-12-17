const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationMasterController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), designationController.createDesignation);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), designationController.getDesignations);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), designationController.getDesignationById);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), designationController.updateDesignation);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), designationController.deleteDesignation);

module.exports = router;