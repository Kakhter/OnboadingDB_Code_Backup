

const Education = require('../models/educationModel'); // Adjust path as necessary

// Create a new education record
const createEducation = async (data) => {
    try {
        return await Education.create(data);
    } catch (error) {
        throw new Error(`Error creating education record: ${error.message}`);
    }
};

// Get all education records
const getAllEducation = async () => {
    try {
        return await Education.findAll();
    } catch (error) {
        throw new Error(`Error fetching education records: ${error.message}`);
    }
};

// Get a single education record by ID
const getEducationById = async (id) => {
    try {
        const record = await Education.findByPk(id);
        if (!record) {
            throw new Error('Education record not found');
        }
        return record;
    } catch (error) {
        throw new Error(`Error fetching education record: ${error.message}`);
    }
};

// Update an education record by ID
const updateEducation = async (id, data) => {
    try {
        const [updated] = await Education.update(data, {
            where: { EducationID: id },
            returning: true
        });
        if (updated === 0) {
            throw new Error('Education record not found');
        }
        return updated;
    } catch (error) {
        throw new Error(`Error updating education record: ${error.message}`);
    }
};

// Delete an education record by ID
const deleteEducation = async (id) => {
    try {
        const deleted = await Education.destroy({
            where: { EducationID: id }
        });
        if (deleted === 0) {
            throw new Error('Education record not found');
        }
        return deleted;
    } catch (error) {
        throw new Error(`Error deleting education record: ${error.message}`);
    }
};

module.exports = {
    createEducation,
    getAllEducation,
    getEducationById,
    updateEducation,
    deleteEducation
};
