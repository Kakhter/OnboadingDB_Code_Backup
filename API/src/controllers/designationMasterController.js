// controllers/designationController.js
const designationService = require('../services/designationMasterService');

exports.createDesignation = async (req, res) => {
    try {
        const designation = await designationService.createDesignation(req.body);
        res.status(201).json(designation);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: 'Validation error: Duplicate entry found.',
                error: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Error creating record',
                error
            });
        }
    }
};

exports.getDesignations = async (req, res) => {
    try {
        const designations = await designationService.getDesignations();
        res.status(200).json(designations);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getDesignationById = async (req, res) => {
    try {
        const designation = await designationService.getDesignationById(req.params.id);
        if (designation) {
            res.status(200).json(designation);
        } else {
            res.status(404).json({
                message: 'Designation not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateDesignation = async (req, res) => {
    try {
        const designation = await designationService.updateDesignation(req.params.id, req.body);
        if (designation[0] === 1) {
            res.status(200).json({
                message: 'Designation updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Designation not found'
            });
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: 'Validation error: Duplicate entry found.',
                error: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Error creating record',
                error
            });
        }
    }
};

exports.deleteDesignation = async (req, res) => {
    try {
        const result = await designationService.deleteDesignation(req.params.id);
        if (result === 1) {
            res.status(200).json({
                message: 'Designation deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Designation not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};