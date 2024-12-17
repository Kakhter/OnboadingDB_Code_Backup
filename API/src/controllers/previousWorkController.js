const previousWorkService = require('../services/previousWorkTranService');

exports.create = async (req, res) => {
    try {
        const previousWork = await previousWorkService.createPreviousWork(req.body);
        res.status(201).json(previousWork);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const previousWorks = await previousWorkService.getPreviousWorks();
        res.status(200).json(previousWorks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.findByUserId = async (req, res) => {
    try {
        const previousWorks = await previousWorkService.getPreviousWorkByUserId(req.params.userId);
        res.status(200).json(previousWorks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const previousWork = await previousWorkService.getPreviousWorkById(req.params.id);
        if (previousWork) {
            res.status(200).json(previousWork);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const [affectedRows] = await previousWorkService.updatePreviousWork(req.params.id, req.body);
        if (affectedRows) {
            const updatedPreviousWork = await previousWorkService.getPreviousWorkById(req.params.id);
            res.status(200).json(updatedPreviousWork);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const affectedRows = await previousWorkService.deletePreviousWork(req.params.id);
        if (affectedRows) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};