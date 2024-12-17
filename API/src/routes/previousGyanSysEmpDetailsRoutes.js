// routes/previousGyanSysEmployeeDetailsRoutes.js
const express = require('express');
const router = express.Router();
const previousGyanSysEmployeeDetailsController = require('../controllers/previousGyanSysEmpDetailsController');
const { authorizeRoles, isPasswordChanged } = require('../middleware/authMiddleware');

router.get('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousGyanSysEmployeeDetailsController.getAllEmployeeDetails);
router.get('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousGyanSysEmployeeDetailsController.getEmployeeDetailByUserId);
router.post('/', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousGyanSysEmployeeDetailsController.createEmployeeDetail);
router.put('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousGyanSysEmployeeDetailsController.updateEmployeeDetail);
router.delete('/:id', authorizeRoles([1, 2, 3]), isPasswordChanged(), previousGyanSysEmployeeDetailsController.deleteEmployeeDetail);

module.exports = router;
