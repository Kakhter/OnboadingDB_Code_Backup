// controllers/certificateController.js
const certificateService = require('../services/certificateTranService');

// exports.createCertificate = async (req, res) => {
//     try {
//         const certificate = await certificateService.createCertificate(req.body);
//         res.status(201).json(certificate);
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

exports.createCertificate = async (req, res) => {
    try {

        //delete the existing certificate if exists.

        const result=  await certificateService.deleteCertificateByUserID(req.body[0].UserID);

        
        const certificatesArray = Array.isArray(req.body) ? req.body : [req.body];
        const certificates = await Promise.all(certificatesArray.map(certificate =>
            certificateService.createCertificate(certificate)
        ));
        res.status(201).json(certificates);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getCertificates = async (req, res) => {
    try {
        const certificates = await certificateService.getCertificates();
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getCertificateByUserId = async (req, res) => {
    try {
        const certificate = await certificateService.getCertificateByUserId(req.params.userId);
        if (certificate) {
            res.status(200).json(certificate);
        } else {
            res.status(404).json({
                message: 'Certificate not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await certificateService.getCertificateById(req.params.id);
        if (certificate) {
            res.status(200).json(certificate);
        } else {
            res.status(404).json({
                message: 'Certificate not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateCertificate = async (req, res) => {
    try {
        const [updated] = await certificateService.updateCertificate(req.params.id, req.body);
        if (updated) {
            res.status(200).json({
                message: 'Certificate updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Certificate not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.deleteCertificate = async (req, res) => {
    try {
        const result = await certificateService.deleteCertificate(req.params.id);
        if (result) {
            res.status(200).json({
                message: 'Certificate deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Certificate not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// exports.deleteCertificateByUserID = async (UserID, res) => {
//     try {
//         const result = await certificateService.deleteCertificateByUserID(UserID);
//         if (result) {
//             res.status(200).json({
//                 message: 'Certificate deleted successfully'
//             });
//         } else {
//             res.status(404).json({
//                 message: 'Certificate not found'
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };