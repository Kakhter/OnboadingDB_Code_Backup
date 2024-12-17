const PreviousWork = require('../models/previousWorkTranModel');

exports.createPreviousWork = async (data) => {
    data.CreatedDate = new Date();
    data.UpdatedDate = new Date();
    return await PreviousWork.create(data);
};

exports.getPreviousWorks = async () => {
    return await PreviousWork.findAll();
};

exports.getPreviousWorkByUserId = async (userId) => {
    return await PreviousWork.findAll({
        where: {
            UserID: userId
        }
    });
};

exports.getPreviousWorkById = async (id) => {
    return await PreviousWork.findOne({
        where: {
            PreviousWorkID: id
        }
    });
};

exports.updatePreviousWork = async (id, updatedData) => {
    updatedData.UpdatedDate = new Date();
    return await PreviousWork.update(updatedData, {
        where: {
            PreviousWorkID: id
        }
    });
};

exports.deletePreviousWork = async (id) => {
    return await PreviousWork.destroy({
        where: {
            PreviousWorkID: id
        }
    });
};