const VisaTran = require('../models/visaTranModel');
const PassportTran = require('../models/passportTranModels');
const CountryMaster = require('../models/countryMasterModel');

const getAllVisaTrans = async () => {
    try {
        return await VisaTran.findAll({
            include: [
                { model: PassportTran, as: 'PassportTran' },
                { model: CountryMaster, as: 'CountryMaster' }
            ]
        });
    } catch (error) {
        throw new Error('Error fetching visa transactions: ' + error.message);
    }
};

const getVisaTranById = async (id) => {
    try {
        return await VisaTran.findByPk(id, {
            include: [
                { model: PassportTran, as: 'PassportTran' },
                { model: CountryMaster, as: 'CountryMaster' }
            ]
        });
    } catch (error) {
        throw new Error('Error fetching visa transaction: ' + error.message);
    }
};

const createVisaTran = async (data) => {
    try {
        return await VisaTran.create(data);
    } catch (error) {
        throw new Error('Error creating visa transaction: ' + error.message);
    }
};

const updateVisaTran = async (id, data) => {
    try {
        const visaTran = await VisaTran.findByPk(id);
        if (!visaTran) throw new Error('Visa transaction not found');

        return await visaTran.update(data);
    } catch (error) {
        throw new Error('Error updating visa transaction: ' + error.message);
    }
};

const deleteVisaTran = async (id) => {
    try {
        const visaTran = await VisaTran.findByPk(id);
        if (!visaTran) throw new Error('Visa transaction not found');

        return await visaTran.destroy();
    } catch (error) {
        throw new Error('Error deleting visa transaction: ' + error.message);
    }
};

const getVisaTransByPassportId = async (passportId) => {
    try {
        return await VisaTran.findAll({
            where: { PassportID: passportId },
            include: [
                { model: PassportTran, as: 'PassportTran' },
                { model: CountryMaster, as: 'CountryMaster' }
            ]
        });
    } catch (error) {
        throw new Error('Error fetching visa transactions by passport ID: ' + error.message);
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
