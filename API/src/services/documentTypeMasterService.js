const DocumentTypeMaster = require('../models/documentTypeMasterModel');

// Create a new document type
const createDocumentType = async (data) => {
    try {
        const existingDocumentType = await DocumentTypeMaster.findOne({ where: { DocType: data.DocType } });

        if (existingDocumentType) {
            throw new Error('Document type already exists.');
        }
        const documentType = await DocumentTypeMaster.create(data);
        return documentType;
    } catch (error) {
        throw new Error(`Error creating document type: ${error.message}`);
    }
};

// Get all document types
const getAllDocumentTypes = async () => {
    try {
        const documentTypes = await DocumentTypeMaster.findAll();
        return documentTypes;
    } catch (error) {
        throw new Error(`Error retrieving document types: ${error.message}`);
    }
};

// Get a document type by ID
const getDocumentTypeById = async (id) => {
    try {
        const documentType = await DocumentTypeMaster.findByPk(id);
        if (!documentType) {
            throw new Error('Document type not found');
        }
        return documentType;
    } catch (error) {
        throw new Error(`Error retrieving document type by ID: ${error.message}`);
    }
};

// Update a document type by ID
const updateDocumentType = async (id, data) => {
    try {
        const documentType = await DocumentTypeMaster.findByPk(id);
        if (!documentType) {
            throw new Error('Document type not found');
        }
        const existingDocumentType = await DocumentTypeMaster.findOne({
            where: {
                DocType: data.DocType,
                id: { [Op.ne]: id }
            }
        });
        if (existingDocumentType) {
            throw new Error('Document type with the same name already exists');
        }
        await documentType.update(data);
        return documentType;
    } catch (error) {
        throw new Error(`Error updating document type: ${error.message}`);
    }
};


// Delete a document type by ID
const deleteDocumentType = async (id) => {
    try {
        const documentType = await DocumentTypeMaster.findByPk(id);
        if (!documentType) {
            throw new Error('Document type not found');
        }
        await documentType.destroy();
        return { message: 'Document type deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting document type: ${error.message}`);
    }
};

module.exports = {
    createDocumentType,
    getAllDocumentTypes,
    getDocumentTypeById,
    updateDocumentType,
    deleteDocumentType,
};
