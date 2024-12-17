const express = require('express');
const router = express.Router();
const projectController = require('../controllers/onSiteProjectController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.createProject);
router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.getProjects);
router.get('/getProjectByUserId/:userId', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.getProjectByUserId);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.getProjectById);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.updateProject);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), projectController.deleteProject);

module.exports = router;