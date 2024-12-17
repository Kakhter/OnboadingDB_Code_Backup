// services/certificateService.js
const Certificate = require('../models/certificateTranModel');

exports.createCertificate = async (certificateData) => {
    try {
    certificateData.CreatedDate = new Date;
    certificateData.UpdatedDate = new Date;
    certificateData.CertificateName = certificateData.CertificationName;
    return await Certificate.create(certificateData);
    }
    catch(error){
        console.log("create certificate issue");
      console.log(error);
    }
};

exports.getCertificates = async () => {
    return await Certificate.findAll();
};

exports.getCertificateByUserId = async (userId) => {
    return await Certificate.findAll({
        where: {
            UserID: userId
        }
    });
};

exports.getCertificateById = async (id) => {
    return await Certificate.findOne({
        where: {
            CertificateID: id
        }
    });
};

exports.updateCertificate = async (id, updatedData) => {
    updatedData.UpdatedDate = new Date;
    return await Certificate.update(updatedData, {
        where: {
            CertificateID: id
        }
    });
};

exports.deleteCertificate = async (id) => {
    return await Certificate.destroy({
        where: {
            CertificateID: id
        }
    });
};

exports.deleteCertificateByUserID = async (id) => {
    return await Certificate.destroy({
        where: {
            UserID: id
        }
    });
};