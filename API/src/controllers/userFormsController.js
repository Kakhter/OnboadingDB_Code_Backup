const userFormService=require('../services/userFormsService');
const getAll = async (req, res) => {
    try {
        const allusers = await userFormService.getAll();
        res.json(allusers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markAsSubmitted = async (req, res) => { // markallsubmitted
    try {
        const userId= req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'UserID is required' });
        }
        await userFormService.markAsSubmitted(userId);

        res.status(200).json({ message: 'Successfully Submitted!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markAccepted = async (req, res) => {
    try {
        const userId= req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'UserID is required' });
        }
        await userFormService.markAccepted(userId,req.body);

        res.status(200).json({ message: 'Response Accepted!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markRejected = async (req, res) => {
    try {
        const userId= req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'UserID is required' });
        }
        await userFormService.markRejected(userId,req.body);

        res.status(200).json({ message: 'Response Rejected!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllAccepted=async(req,res)=>{
    try {
        const AcceptedUserDetails=await userFormService.getAllAccepted();
        res.json(AcceptedUserDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getPersonalDetailByID=async(req,res)=>{
    try {
        const AcceptedUserDetails= await userFormService.getPersonalDetailByID();
        res.json(AcceptedUserDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 
module.exports={
    getAll,
    markAsSubmitted,
    markAccepted,
    markRejected,
    getAllAccepted,
    getPersonalDetailByID
};