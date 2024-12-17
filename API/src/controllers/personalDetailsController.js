// controllers/personalDetailsController.js
const personalDetailsService = require('../services/personalDetailsService');

const createPersonalDetails = async (req, res) => {


//---------------new code 
console.log("---------------------------777777777777777777777777");
console.log("calling from personalDetails create77777777777");
if(req.body.NewCandidate==false)
{
const newRecord = await personalDetailsService.updatePersonalDetails(req.body.UserID, req.body);
res.status(201).json(newRecord);
return;
}
//----------------end of new code



    try {
        console.log("---------------------------xxxxxxxxxxxxxx");
        console.log("calling from personalDetails create");

        const newRecord = await personalDetailsService.createPersonalDetails(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log(error);
            res.status(400).json({
                message: 'Validation error: Duplicate entry found.',
                error: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Error creating record',
                error
            });
        }
    }
};

const getAllPersonalDetails = async (req, res) => {
    try {
        const records = await personalDetailsService.getAllPersonalDetails();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving records',
            error
        });
    }
};

const getPersonalDetailsByUserId = async (req, res) => {
    try {
        const record = await personalDetailsService.getPersonalDetailsById(req.params.id);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving record',
            error
        });
    }
};

const updatePersonalDetailsByUserId = async (req, res) => {
    try {
        const updatedRecord = await personalDetailsService.updatePersonalDetails(req.params.id, req.body);
        if (updatedRecord) {
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: 'Validation error: Duplicate entry found.',
                error: error.errors
            });
        } else {
            res.status(500).json({
                message: 'Error updating record',
                error
            });
        }
    }
};

const deletePersonalDetailsByUserId = async (req, res) => {
    try {
        const result = await personalDetailsService.deletePersonalDetails(req.params.id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting record',
            error
        });
    }
};

const fetchTheUserWhoSubmittedThePersonalDetails = async (req, res) => {
    try {
        const result = await personalDetailsService.fetchTheUserWhoSubmittedThePersonalDetails();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Error in fetching record',

        });
    }
}
module.exports = {
    createPersonalDetails,
    getAllPersonalDetails,
    getPersonalDetailsByUserId,
    updatePersonalDetailsByUserId,
    deletePersonalDetailsByUserId,
    fetchTheUserWhoSubmittedThePersonalDetails
};