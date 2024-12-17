const empMasterService = require('../services/empService');

const createEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = await empMasterService.createEmployee(employeeData);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await empMasterService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await empMasterService.getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await empMasterService.updateEmployee(req.params.id, req.body);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const result = await empMasterService.deleteEmployee(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};