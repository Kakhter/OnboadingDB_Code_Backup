const DocumentTran = require('../models/documentTranModel');
const { Op } = require('sequelize');

const createDocumentTran = async (data) => {
    try {
        const multipleDocument = [1,11, 12, 13];
        var existingDocument=[];
        if(data.PreviousWorkID)
        {
         existingDocument = await DocumentTran.findOne({ where: { PreviousWorkID: data.PreviousWorkID, DocTypeID: data.DocTypeID} });
        }
        else{
            existingDocument = await DocumentTran.findOne({ where: { UserID: data.UserID, DocTypeID: data.DocTypeID } });
        }
        
        // console.log(existingDocument)
        if (existingDocument != null && multipleDocument.includes(data.DocTypeID)) {
            //new code ######
            const document1 = await updateDocumentTran(existingDocument.DocID,data);
            return { success: true, DocID: document1.DocID };
            //return { success: false, message: "Document Already Present" };
        }
        const document = await DocumentTran.create(data);
        return { success: true, DocID: document.DocID };
    } catch (error) {
        throw new Error(`Error creating document transaction: ${error.message}`);
    }
};

const createDocumentByHrTran = async (data) => {

    const ALLOWED_DOCUMENT_TYPES = [11, 12, 13];
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    // Validate input data
    if (!data.UserID || !data.DocTypeID || !data.DocScanned || !data.IDNumber) {
        return { success: false, message: 'Missing required fields.' };
    }

    // Validate file size
    if (data.DocScanned.length > MAX_FILE_SIZE_BYTES) {
        return { success: false, message: `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.` };
    }

    try {
        // Check if the document already exists
        const existingDocument = await DocumentTran.findOne({
            where: { UserID: data.UserID, DocTypeID: data.DocTypeID }
        });

        // Determine if multiple documents are allowed for the given type
        const allowsMultipleDocuments = ALLOWED_DOCUMENT_TYPES.includes(data.DocTypeID);

        if (existingDocument) {
            if (allowsMultipleDocuments) {
                // Document type allows multiple entries, create a new document
                const document = await DocumentTran.create(data);
                return { success: true, DocID: document.DocID };
            } else {
                // Document type does not allow multiple entries, update the existing document
                await DocumentTran.update(data, {
                    where: { UserID: data.UserID, DocTypeID: data.DocTypeID }
                });
                return { success: true, DocID: existingDocument.DocID };
            }
        } else {
            // No existing document, create a new document
            const document = await DocumentTran.create(data);
            return { success: true, DocID: document.DocID };
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: "Unique constraint error: This IDNumber already exists." };
        }
        console.error('Error in createDocumentByHrTran service:', error);
        throw new Error(`Error creating or updating document transaction: ${error.message}`);


    }
};





// Get all document transactions
const getAllDocumentTrans = async () => {
    try {
        const documentTran = await DocumentTran.findAll({
            attributes: ['DocID', 'mimeType', 'UserID'],
            include: [
                { model: require('../models/userModel'), as: 'User' },
                { model: require('../models/documentTypeMasterModel'), as: 'DocumentTypeMaster' }
            ],
        });
        return documentTran;
    } catch (error) {
        throw new Error(`Error retrieving document transactions: ${error.message}`);
    }
};

// Get a document transaction by ID
const getDocumentTranById = async (DocID) => {
    try {
        const document = await DocumentTran.findOne({
            where: { DocID: DocID },
            attributes: ['DocScanned', 'mimeType']
        });

        if (!document) {
            throw new Error('Document not found');
        }

        return document;
    } catch (error) {
        throw new Error(`Error retrieving document: ${error.message}`);
    }
};


//docuemnt according to the user id only for the admin

const getDocumentTranByUserId = async (UserID) => {
    try {

        const documentTran = await DocumentTran.findAll({
            where: {
                UserID: UserID
            },
            attributes: ['DocID', 'mimeType', 'UserID', 'PreviousWorkID'],
            include: [
                { model: require('../models/documentTypeMasterModel'), as: 'DocumentTypeMaster' }
            ],
        });
        if (documentTran.length === 0) {
            throw new Error('No document found for this user');
        }

        return documentTran;
    } catch (error) {
        throw new Error(`Error retrieving document transactions by User: ${error.message}`);
    }
}

//get document of the user as per the document type: 'DocumentTypeID'
const getDocumentTranByUserAsPerTheDocType = async (UserID, DocTypeID) => {
    try {

        const documentTran = await DocumentTran.findOne({
            where: {
                UserID: UserID,
                DocTypeID: DocTypeID
            },
            attributes: ['DocID', 'mimeType', 'UserID'],
            include: [
                { model: require('../models/documentTypeMasterModel'), as: 'DocumentTypeMaster' }
            ],
        });
        //console.log(documentTran);

        if (documentTran.length === 0) {
            throw new Error('No document transactions found for this user');
        }

        return documentTran;
    } catch (error) {
        throw new Error(`Error retrieving document transactions by User: ${error.message}`);
    }
};

// Update a document transaction by DocID
const updateDocumentTran = async (id, data) => {
    try {

        const existingDocument = await DocumentTran.findOne({ where: { UserID: data.UserID, DocID: id } });

        if (existingDocument == null) {
            return { success: false, message: "No Document Present" };

        }
        await DocumentTran.update(data, {
            where: { DocID: id },
            returning: true,
        });
        //console.log(document);
        return { success: true, DocID: existingDocument.DocID };
    } catch (error) {
        //console.error('Error details:', error);
        throw new Error(`Error Updating document transaction: ${error.message}`);
    }
};

// Delete a document transaction by ID
const deleteDocumentTran = async (id) => {
    try {
        const documentTran = await DocumentTran.findByPk(id);
        if (!documentTran) {
            throw new Error('Document transaction not found');
        }
        await documentTran.destroy();
        return { message: 'Document transaction deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting document transaction: ${error.message}`);
    }
};

module.exports = {
    createDocumentTran,
    getAllDocumentTrans,
    getDocumentTranById,
    updateDocumentTran,
    deleteDocumentTran,
    getDocumentTranByUserAsPerTheDocType,
    getDocumentTranByUserId,
    createDocumentByHrTran
};
