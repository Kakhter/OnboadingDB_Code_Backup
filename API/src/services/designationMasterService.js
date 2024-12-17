// services/designationService.js
const Designation = require('../models/DesignationMasterModel');

exports.createDesignation = async (designationData) => {
    designationData.CreatedDate = new Date;
    designationData.UpdatedDate = new Date;
    return await Designation.create(designationData);
};

exports.getDesignations = async () => {
    return await Designation.findAll();
};

exports.getDesignationById = async (id) => {
    return await Designation.findByPk(id);
};

exports.updateDesignation = async (id, updatedData) => {
    updatedData.UpdatedDate = new Date;
    return await Designation.update(updatedData, {
        where: {
            DesignationID: id
        }
    });
};

exports.deleteDesignation = async (id) => {
    return await Designation.destroy({
        where: {
            DesignationID: id
        }
    });
};