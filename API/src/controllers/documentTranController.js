const documentTranService = require('../services/documentTranService');
const multer = require('multer');
const path = require('path');
const { DATE } = require('sequelize');
const User = require('../models/userModel');
const { Console } = require('console');

// Set up storage configuration for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Create a new document transaction
const createDocumentTran = [
    upload.single('DocScanned'),
    async (req, res) => {
        try {
            // Extract file and other fields
            const { IDNumber, DocTypeID} = req.body;
            const PreviousWorkID = req.body.PreviousWorkID;
            const DocScanned = req.file ? req.file.buffer :req.body.DocScanned;
            const mimeType = req.file ? req.file.mimetype : null;
            const { UserID } = req.user;
            const data = {
                DocScanned,
                mimeType,
                IDNumber,
                UserID: req.UserID || UserID,
                DocTypeID: parseInt(DocTypeID, 10),
                CreatedBy: UserID,
                UpdatedBy: UserID,
                PreviousWorkID
            };
            var response;
            if (req.UserID) {
                response = await documentTranService.createDocumentByHrTran(data);
            } else {
                response = await documentTranService.createDocumentTran(data);
            }
            if (response.success) {
                return res.status(201).json({
                    success: true,
                    message: 'Document Uploaded successfully',
                    DocID: response.DocID
                });
            }
            console.log(response.message);
            return res.status(400).json({ success: false, message: response.message });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ success: false, message: "Unique constraint error: This IDNumber already exists." });
            }
            console.error('Error creating document transaction:', error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
];




// Get all document transactions
const getAllDocumentTrans = async (req, res) => {
    try {
        const documentTrans = await documentTranService.getAllDocumentTrans();
        res.status(200).json({
            success: true,
            data: documentTrans,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get a document  by DocID
const getDocumentTranById = async (req, res) => {
    try {
        const DocID = parseInt(req.params.id, 10);
        const documentTran = await documentTranService.getDocumentTranById(DocID);
        const { DocScanned, mimeType } = documentTran;
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="document_${DocID}.${mimeType.split('/')[1]}"`);
        res.send(DocScanned);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

//get the user document on the basis of user id : this route is only for the admin
const getDocumentTranByUserId = async (req, res) => {
    try {
        const UserID = parseInt(req.params.id, 10);
        const documentTran = await documentTranService.getDocumentTranByUserId(UserID);
        //console.log(documentTran);
        res.status(200).json({
            success: true,
            data: documentTran,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

//get document by userid and by the Document Type
const getDocumentTranByUserAsPerTheDocType = async (req, res) => {
    try {

        const UserID = req.user.UserID;
        console.log(UserID)
        const DocTypeID = parseInt(req.params.id, 10);
        const documentTran = await documentTranService.getDocumentTranByUserAsPerTheDocType(UserID, DocTypeID);
        console.log(documentTran);
        res.status(200).json({
            success: true,
            data: documentTran,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Update a document transaction by ID
const updateDocumentTran = [
    upload.single('DocScanned'),
    async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { IDNumber, DocTypeID } = req.body;

            const DocScanned = req.file ? req.file.buffer : null;
            const mimeType = req.file ? req.file.mimetype : null;
            const { UserID } = req.user;


            const data = {
                DocScanned,
                mimeType,
                IDNumber,
                UserID,
                DocTypeID: parseInt(DocTypeID, 10),
                CreatedBy: UserID,
                UpdatedBy: UserID
            };

            const response = await documentTranService.updateDocumentTran(id, data);
            //console.log(response);
            if (response.success) {
                return res.status(201).json({
                    success: true,
                    message: 'Document Updated successfully',
                    DocID: response.DocID
                });
            }
            return res.status(400).json({ success: false, message: response.message });
        } catch (error) {
            console.error('Error Update document transaction:', error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
];

// Delete a document transaction by ID
const deleteDocumentTran = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await documentTranService.deleteDocumentTran(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDocumentTran,
    getAllDocumentTrans,
    getDocumentTranById,
    updateDocumentTran,
    deleteDocumentTran,
    getDocumentTranByUserAsPerTheDocType,
    getDocumentTranByUserId
};
