const visaTranService = require('../services/visaTranService');

const getAllVisaTrans = async (req, res) => {
    try {
        const visaTrans = await visaTranService.getAllVisaTrans();
        res.status(200).json(visaTrans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVisaTranById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const visaTran = await visaTranService.getVisaTranById(id);
        if (!visaTran) return res.status(404).json({ error: 'Visa transaction not found' });
        res.status(200).json(visaTran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createVisaTran = async (req, res) => {
    try {
        const data = req.body;
        const visaTran = await visaTranService.createVisaTran(data);
        res.status(201).json(visaTran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateVisaTran = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        const visaTran = await visaTranService.updateVisaTran(id, data);
        if (!visaTran) return res.status(404).json({ error: 'Visa transaction not found' });
        res.status(200).json(visaTran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVisaTran = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await visaTranService.deleteVisaTran(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVisaTransByPassportId = async (req, res) => {
    try {
        const passportId = parseInt(req.params.passportId, 10);
        const visaTrans = await visaTranService.getVisaTransByPassportId(passportId);
        if (!visaTrans || visaTrans.length === 0) return res.status(404).json({ error: 'No visa transactions found for this passport ID' });
        res.status(200).json(visaTrans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllVisaTrans,
    getVisaTranById,
    createVisaTran,
    updateVisaTran,
    deleteVisaTran,
    getVisaTransByPassportId
};
