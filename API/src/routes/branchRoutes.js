
const express = require('express');
const branchController = require('../controllers/branchController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new branch
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.createBranch);

// Get all branches
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.getAllBranches);

// Get branch by ID
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.getBranchById);

// Update branch
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.updateBranch);

// Delete branch
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.deleteBranch);

router.get('/branches/:degreeId', authorizeRoles([1, 2, 3]), isPasswordChanged(), branchController.getbranchByDegreeID);

module.exports = router;
