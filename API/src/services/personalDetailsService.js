// services/personalDetailsService.js
const PersonalDetails = require('../models/personalDetailsModel');

const createPersonalDetails = async (data) => {
    data.CreatedDate = new Date();
    data.UpdatedDate = new Date();
    return await PersonalDetails.create(data);
};

const getAllPersonalDetails = async () => {
    return await PersonalDetails.findAll();
};

const getPersonalDetailsById = async (id) => {
    return await PersonalDetails.findOne({
        where: {
            UserID: id
        }, include: [
            { model: require('../models/userModel'), as: 'User', attributes: ['Email'] },
        ],
    });
};

const updatePersonalDetails = async (id, data) => {
    data.UpdatedDate = new Date();
    const record = await PersonalDetails.findOne({
        where: {
            UserID: id
        }
    });
    if (record) {
        return await record.update(data);
    }
    return null;
};

const deletePersonalDetails = async (id) => {
    const record = await PersonalDetails.findOne({
        where: {
            UserID: id
        }
    });
    if (record) {
        return await record.destroy();
    }
    return null;
};

//fecth the details of the user who submitted the personal details form
const fetchTheUserWhoSubmittedThePersonalDetails = async () => {
    const data = await PersonalDetails.findAll({
        where: {
            Submitted: true
        },
        include: [
            { model: require('../models/userModel'), as: 'User', attributes: ['Email'] },
        ],
    });
    return data;
}

module.exports = {
    createPersonalDetails,
    getAllPersonalDetails,
    getPersonalDetailsById,
    updatePersonalDetails,
    deletePersonalDetails,
    fetchTheUserWhoSubmittedThePersonalDetails
};