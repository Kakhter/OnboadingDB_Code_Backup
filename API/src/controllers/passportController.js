// controllers/passportTranController.js
const passportTranService = require('../services/passportService');

const createPassportTran = async (req, res) => {
    try {
        const newRecord = await passportTranService.createPassportTran(req.body);
        res.status(201).json(newRecord);
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

const getAllPassportTrans = async (req, res) => {
    try {
        const records = await passportTranService.getAllPassportTrans();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving records',
            error
        });
    }
};

const getPassportTranByUserId = async (req, res) => {
    try {
        const record = await passportTranService.getPassportTranByUserId(req.params.userId);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving record',
            error
        });
    }
};

const updatePassportTranByUserId = async (req, res) => {
    try {
        const updatedRecord = await passportTranService.updatePassportTran(req.params.userId, req.body);
        if (updatedRecord) {
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        if (error.message.includes('The new passport number cannot be the same as the old passport number')) {
            res.status(400).json({
                message: error.message
            });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: 'Validation error: Duplicate entry found.',
                error: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Error updating record',
                error
            });
        }
    }
};

const deletePassportTranByUserId = async (req, res) => {
    try {
        const result = await passportTranService.deletePassportTran(req.params.userId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting record',
            error
        });
    }
};

module.exports = {
    createPassportTran,
    getAllPassportTrans,
    getPassportTranByUserId,
    updatePassportTranByUserId,
    deletePassportTranByUserId
};