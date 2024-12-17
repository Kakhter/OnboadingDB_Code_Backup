const PreviousGyanSysEmployeeDetailsService = require('../services/previousGyanSysEmpDetailsService');

const getAllEmployeeDetails = async (req, res) => {
    try {
        const employeeDetails = await PreviousGyanSysEmployeeDetailsService.getAll();
        res.json(employeeDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployeeDetailByUserId = async (req, res) => {
    try {
        const employeeDetail = await PreviousGyanSysEmployeeDetailsService.getByUserId(req.params.id);
        if (employeeDetail) {
            res.json(employeeDetail);
        } else {
           // res.status(404).json({ message: 'Employee detail not found' });
           res.json(employeeDetail);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEmployeeDetail = async (req, res) => {
    try {
        const employeeDetail = await PreviousGyanSysEmployeeDetailsService.create(req.body);
        res.status(201).json(employeeDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEmployeeDetail = async (req, res) => {
    try {
        const updatedEmployeeDetail = await PreviousGyanSysEmployeeDetailsService.update(req.params.id, req.body);
        if (updatedEmployeeDetail[0]) {
            res.json({ message: 'Employee detail updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmployeeDetail = async (req, res) => {
    try {
        const deleted = await PreviousGyanSysEmployeeDetailsService.deleteById(req.params.id);
        if (deleted) {
            res.json({ message: 'Employee detail deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllEmployeeDetails,
    getEmployeeDetailByUserId,
    createEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployeeDetail
};
