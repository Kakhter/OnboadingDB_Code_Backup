const { Op } = require('sequelize');
const PersonalDetails = require('../models/personalDetailsModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const executeQuery = require("../config/postgres");


const getAll = async () => {
    try {
        const getIdsWithSubmittedTrue = async (model) => {
            const records = await model.findAll({
                attributes: ['UserID'],
                where: { Submitted: true , Accepted: false , Rejected:false  }
            });
            return records.map(record => record.UserID, record=>record.Accepted, record=>record.Rejected);
        };

        const personalUserIds = await getIdsWithSubmittedTrue(PersonalDetails);
        // const educationUserIds = await getIdsWithSubmittedTrue(Education);
        // const previousGyanSysEmpUserIds = await getIdsWithSubmittedTrue(PreviousGyanSysEmp);
        // const previousWorkUserIds = await getIdsWithSubmittedTrue(PreviousWork);

        // const commonUserIds = personalUserIds
        //     .filter(UserID => educationUserIds.includes(UserID))
        //     .filter(UserID => previousGyanSysEmpUserIds.includes(UserID))
        //     .filter(UserID => previousWorkUserIds.includes(UserID));

        if (personalUserIds.length === 0) {
            return []; 
        }

        const userDetails = await User.findAll({
            where: {
                UserID: {
                    [Op.in]: personalUserIds
                }
            }
        });

        return userDetails; 

    } catch (error) {
        console.error('Error fetching details:', error);
        throw error; 
    }
};

const markAsSubmitted = async (userId) => {
    try {
        await PersonalDetails.update({ Submitted: true,Accepted:false,Rejected:false,UpdatedDate:new Date}, { where: { UserID: userId } });
        // await Education.update({ Submitted: true }, { where: { UserID: userId } });
        // await PreviousGyanSysEmp.update({ Submitted: true }, { where: { UserID: userId } });
        // await PreviousWork.update({ Submitted: true }, { where: { UserID: userId } });

    } catch (error) {
        console.error('Error updating records:', error);
        throw error;
    }
};

const markAccepted=async(userId,body)=>{
    try {
        await PersonalDetails.update({Accepted:true,Rejected:false,Submitted:true,Remarks:body.Remarks,UpdatedDate:new Date},{where:{UserID:userId}});
        const user = await User.findOne({
            where: {
                UserID:userId
            }
        });
        const email = user.Email;
        await sendEmailNotification(
            email,
            'Form Acceptance Notification',
            `Dear ${user.FirstName},\n\nYour  Form has been Accepted.\n Remarks: ${body.Remarks}\n\nThank you.`
        );
    } catch (error) {
        console.error('Error updating records:', error);
        throw error;
    }
}

const markRejected=async(userId,body)=>{
    try {
        await PersonalDetails.update({Rejected:true,Accepted:false,Submitted:false,Remarks:body.Remarks,UpdatedDate:new Date},{where:{UserID:userId}});
        const user = await User.findOne({
            where: {
                UserID: userId
            }
        });
        const email = user.Email;
        await sendEmailNotification(
            email,
            'Form Rejection Notification',
            `Dear ${user.FirstName},\n\nYour  Form has been Rejected.\n Remarks: ${body.Remarks}\n\nThank you.`
        );
        return 'Rejected and sent email to candidate.'
    } catch (error) {
        console.error('Error updating records:', error);
        return 'Error while rejecting the request.'
       // throw error;
    }
}


const sendEmailNotification = async (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        // service: 'gmail',  
        // auth: {
        //     user: 'gyansysonboarding@gmail.com',
        //     pass: 'lkggbneaqfoxoirc'
        // }
        service: 'gmail',  
        auth: {
            user: 'gyansysboarding@gmail.com',
            pass: 'cjft vmka dqcz xryw'
        }

        
        

    });

    let mailOptions = {
        //from: 'gyansysonboarding@gmail.com',
        from: '2041011089.abhishekkumar@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};

const getAllAccepted=async()=>{
    try {
        const getIdsWithAcceptedTrue = async (model) => {
            const records = await model.findAll({
                attributes: ['UserID'],
                where: { Accepted: true }
            });
            return records.map(record => record.UserID);
        };
        const AcceptedUserIds=await getIdsWithAcceptedTrue(PersonalDetails);
    if (AcceptedUserIds.length === 0) {
        return [];
    }
 
    const AcceptedUserDetails = await User.findAll({
        where: {
            UserID: {
                [Op.in]: AcceptedUserIds
            }
        }
    });
 
    return AcceptedUserDetails;
       
    } catch (error) {
        console.error('Error updating records:', error);
        throw error;
    }
     
}

const getPersonalDetailByID =async() => {
     var result = await executeQuery(
      `select * from test` 
    )
    return (result);
    // .then((result) => {
    //     //res.status(200).send(result);
    //     console.log("-------------------1");
    //     console.log(result);
    //   })
    // .catch((error) => {
    //     console.error("Error executing query:", error);
    //     //res.status(500).send(error);
    // });
  };
 
module.exports = {
    getAll,
    markAsSubmitted,
    markAccepted,
    markRejected,
    getAllAccepted,
    getPersonalDetailByID
 };