const documentTypeService = require('../services/documentTypeMasterService');

// Create a new document type
const createDocumentType = async (req, res) => {
    try {
        const data = req.body;
        const documentType = await documentTypeService.createDocumentType(data);
        res.status(201).json({
            success: true,
            message: 'Document type created successfully',
            data: documentType,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all document types
const getAllDocumentTypes = async (req, res) => {
    try {
        const documentTypes = await documentTypeService.getAllDocumentTypes();
        res.status(200).json({
            success: true,
            data: documentTypes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a document type by ID
const getDocumentTypeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const documentType = await documentTypeService.getDocumentTypeById(id);
        res.status(200).json({
            success: true,
            data: documentType,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Update a document type by ID
const updateDocumentType = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        const updatedDocumentType = await documentTypeService.updateDocumentType(id, data);
        res.status(200).json({
            success: true,
            message: 'Document type updated successfully',
            data: updatedDocumentType,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// Delete a document type by ID
const deleteDocumentType = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await documentTypeService.deleteDocumentType(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDocumentType,
    getAllDocumentTypes,
    getDocumentTypeById,
    updateDocumentType,
    deleteDocumentType,
};
