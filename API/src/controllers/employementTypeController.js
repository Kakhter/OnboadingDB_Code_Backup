//const EmploymentType = require('../models/employmentTypeMasterModel'); // Adjust the path as needed
const EmploymentType = require('../models/employmentTypeMasterModel');

exports.createEmploymentType = async (req, res) => {
    try {
        const { EmploymentTypeDesc, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate } = req.body;
        const employmentType = await EmploymentType.create({
            EmploymentTypeDesc,
            CreatedBy,
            CreatedDate,
            UpdatedBy,
            UpdatedDate
        });
        res.status(201).json(employmentType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all EmploymentTypes
exports.getAllEmploymentTypes = async (req, res) => {
    try {
        const employmentTypes = await EmploymentType.findAll();
        res.status(200).json(employmentTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single EmploymentType by ID
exports.getEmploymentTypeById = async (req, res) => {
    try {
        const id = req.params.id;
        const employmentType = await EmploymentType.findByPk(id);
        if (employmentType) {
            res.status(200).json(employmentType);
        } else {
            res.status(404).json({ message: 'EmploymentType not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an EmploymentType by ID
exports.updateEmploymentTypeById = async (req, res) => {
    try {
        const id = req.params.id;
        const { EmploymentTypeDesc, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate } = req.body;
        const [updated] = await EmploymentType.update(
            { EmploymentTypeDesc, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate },
            { where: { EmploymentTypeID: id } }
        );
        if (updated) {
            const updatedEmploymentType = await EmploymentType.findByPk(id);
            res.status(200).json(updatedEmploymentType);
        } else {
            res.status(404).json({ message: 'EmploymentType not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an EmploymentType by ID
exports.deleteEmploymentTypeById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await EmploymentType.destroy({ where: { EmploymentTypeID: id } });
        if (deleted) {
            res.status(204).json({ message: 'EmploymentType deleted' });
        } else {
            res.status(404).json({ message: 'EmploymentType not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
