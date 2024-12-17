const {
    where,
    Op
} = require('sequelize');
const EmpMaster = require('../models/EmpMasterModel');

const createEmployee = async (employeeData) => {
    try {
        employeeData.CreatedDate = new Date;
        employeeData.UpdatedDate = new Date;
        const existingEmployee = await EmpMaster.findOne({
            where: {
                EmpID: employeeData.EmpID
            }
        });

        if (existingEmployee) {
            throw new Error('EmpID must be unique');
        }
        const existingEmailID = await EmpMaster.findOne({
            where: {
                GyanSysEmailID: employeeData.GyanSysEmailID
            }
        });

        if (existingEmailID) {
            throw new Error('EmailID must be unique');
        }
        const newEmployee = await EmpMaster.create(employeeData);
        return newEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllEmployees = async () => {
    try {
        return await EmpMaster.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

const getEmployeeById = async (id) => {
    try {
        return await EmpMaster.findOne({
            where: {
                EmpID: id
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateEmployee = async (id, updatedData) => {
    try {
        updatedData.UpdatedDate = new Date;
        const employee = await EmpMaster.findOne({
            where: {
                EmpID: id,
            }
        });
        if (!employee) {
            throw new Error('Employee not found');
        }
        await EmpMaster.update(updatedData, {
            where: {
                EmpID: id
            }
        });
        return await EmpMaster.findOne({
            where: {
                EmpID: updatedData.EmpID
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteEmployee = async (id) => {
    try {
        const employee = await EmpMaster.findOne({
            where: {
                EmpID: id
            }
        });
        if (!employee) {
            throw new Error('Employee not found');
        }
        await EmpMaster.destroy({
            where: {
                EmpID: id
            }
        });
        return {
            message: 'Employee deleted successfully'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};