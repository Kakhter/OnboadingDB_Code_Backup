const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const PersonalDetails = require('../models/personalDetailsModel');
const PreviousWorkTran = require('../models/previousWorkTranModel');
const PreviousGyanSysEmployeeDetails = require('../models/previousGyanSysEmpDetailsModel');
const OnSiteProjectTran = require('../models/onSiteProjectModel');
const CertificationTran = require('../models/certificateTranModel');
const EducationTran = require('../models/educationModel');
const DocumentTranController = require('../controllers/documentTranController');
const Skills=require('../models/skillModel');
const UserSession = require('../models/userSessionModel');
const DocumentTypeMaster=require('../models/documentTypeMasterModel');
const { generateRandomCode, hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtSecret = config.jwtSecret;
const { Op, where } = require('sequelize');
const sequelize = require('../config/db');
const DocumentTran = require('../models/documentTranModel');

// Configure nodemailer transporter
const mailTransporter = nodemailer.createTransport({
    // service: 'hotmail',
    // auth: {
    //     user: 'onboardingapp2024@outlook.com',
    //     pass: 'White@01',
    // }
    // service: 'gmail',  
    //     auth: {
    //         user: 'gyansysonboarding@gmail.com',
    //         pass: 'lkggbneaqfoxoirc'
    //     }

            service: 'gmail',  
            auth: {
                user: 'gyansysboarding@gmail.com',
                pass: 'cjft vmka dqcz xryw'
            }

        // service: 'gmail',  
        // auth: {
        //     user: 'khalid.bharat@gmail.com',
        //     pass: 'ljzv kbhk lqwl lbrq'


});

// // Function to send password email
// async function sendPasswordEmail(email, fullName, randomCode) {
//     try {
//         await mailTransporter.sendMail({
//             from: 'onboardingapp2024@outlook.com',
//             to: email,
//             subject: 'Your Password',
//             text: `Hello ${fullName},\n\nYour password is: ${randomCode}\n\nThank you.`,
//         });
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// }

// Function to send password email
async function sendPasswordEmail(Email, fullName, randomCode) {
    // exports.sendPasswordEmail = async (Email, fullName, randomCode) => {
    try {
        await mailTransporter.sendMail({
            from: 'onboardingapp2024@outlook.com',
            to: Email,
            subject: 'GyanSys::Welcome Aboard !!!',
            html: `
                <p>Hi ${fullName},</p>
                <p>Congratulations and welcome aboard!!</p>
                <p>We are excited to have you join our team and look forward to your first day. To help you get started, please use the credentials and joining link below to complete the necessary documentation.</p>
                
                <p><strong>Action Required:</strong></p>
                <ol>
                    <li><strong>Log In Here:</strong> <a href="http://192.168.7.187/">Click here</a></li>
                    <li><strong>Username:</strong> ${Email}</li>
                    <li><strong>Password:</strong> ${randomCode}</li>
                </ol>
                
                <p><strong>NOTE:</strong> On your first login, you’ll be prompted to update your password. Please remember it for future access.</p>
                
                <p><em>If the link is not working, please copy and paste this URL into your browser: <a href="http://192.168.7.187/">http://192.168.7.187/</a></em></p>
                
                <p>Thank you, and please let us know if you have any questions.</p>
                
                <p>Regards,<br>HR Team<br></p>
                
                <img src="https://gyansys.com/images/logos/gyansys-logo-black.png" alt="Company Logo" style="max-width: 200px;">
            `,
        });
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
// Function to handle sending the random code
// exports.sendCode = async ({ FirstName, MiddleName, LastName, Email, RoleID, CurrentUserID, DOJ, DocTypeID, IDNumber, CandidateID, file }) => {
//     try {
//         if (!Email || !FirstName || !LastName) {
//             return { success: false, message: 'Email, Firstname, Lastname Required' };
//         }
//         let user = await User.findOne({ where: { Email: Email } });
//         const randomCode = generateRandomCode();
//         const hashedPassword = await hashPassword(randomCode);
//         const fullName = `${FirstName} ${MiddleName || ''} ${LastName}`;
//         if (!user) {
//             user = await User.create({
//                 FirstName,
//                 MiddleName,
//                 LastName,
//                 Email: Email,
//                 Password: hashedPassword,
//                 RoleID: RoleID || 1,
//                 DOJ,
//                 DocTypeID,
//                 IDNumber,
//                 CandidateID,
//                 CreatedDate: new Date(),
//                 CreatedBy: CurrentUserID
//             });
//         } else if (user.Active == false) {
//             user.Password = hashedPassword;
//             user.Attempts = 0;
//             user.UpdatedBy = CurrentUserID;
//             user.IDNumber = IDNumber ? IDNumber : user.IDNumber;
//             user.DOJ = DOJ ? DOJ : user.DOJ;
//             user.DocTypeID = DocTypeID ? DocTypeID : user.DocTypeID;
//             user.CandidateID = CandidateID ? CandidateID : user.CandidateID;
//             await user.save();
//         } else {
//             return { success: false, message: 'User already logged in.' };
//         }

//         const emailSent = await sendPasswordEmail(Email, fullName, randomCode);
//         return { success: emailSent, data: user };
//     } catch (error) {
//         //console.error('Error processing request:', error);
//         return { success: false };
//     }
// };


// Function to handle sending the random code In case of Forget Password
const sendForgetCode = async ({ Email }) => {
    try {
        let user = await User.findOne({ where: { Email: Email } });
        const randomCode = generateRandomCode();
        const hashedPassword = await hashPassword(randomCode);
        if (user) {
            user.Password = hashedPassword;
            user.PasswordChanged = false;
            await user.save();
            const emailSent = await sendPasswordEmail(Email, `${user.FirstName} ${user.MiddleName} ${user.LastName}`, randomCode);
            return { success: emailSent };
        }
        return { success: false };
    } catch (error) {
        // console.error('Error processing request:', error);
        return { success: false };
    }
};

//Function For Login With JWT token
const login = async ({ Email, Password }) => {
    try {

        const user = await User.findOne({ where: { Email: Email } });
        // console.log(user);
        if (user && await comparePassword(Password, user.Password)) {
            const role = await Role.findOne({ where: { RoleID: user.RoleID } });
            if (!role) {
                return { success: false };
            } else if (user.Attempts >= 3) {
                return { success: false, message: 'Contact HR' };
            }
            const existingSession = await UserSession.findOne({
                where: {
                    UserID: user.UserID,
                    [Op.or]: [
                        { SessionEndDateTime: { [Op.gt]: new Date() } },
                        { SessionEndDateTime: null }
                    ]
                }
            });
            // console.log(existingSession);
            let session;
            if (!existingSession) {
                session = await UserSession.create({
                    UserID: user.UserID,
                    SessionStartDateTime: new Date(),
                    SessionEndDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
                });
            } else {
                session = existingSession;
            }
            user.Active = true;
            user.Attempts = 0;
            await user.save();
            const tokenPayload = {
                UserID: user.UserID,
                FullName: `${user.FirstName} ${user.MiddleName} ${user.LastName}`,
                Email: user.Email,
                Active: user.Active,
                RoleID: role.RoleID,
                SessionStartDateTime: session.SessionStartDateTime,
                SessionID: session.SessionID,
                PasswordChanged: user.PasswordChanged,
            };
            const responseData = {
                FirstName: user.FirstName,
                MiddleName: user.MiddleName,
                LastName: user.LastName,
                Email: user.Email,
                RoleID: role.RoleID,
                Active: user.Active,
                SessionStartDateTime: session.SessionStartDateTime
            };
            const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1d' });
            console.log("---------------------------loging called");
            return { success: true, token: token, data: responseData };
        } else {
            if (user && user.Attempts <= 3) {
                if (user.Attempts == 3) {
                    user.Active = false;
                    user.UpdatedBy = user.UserID;
                    user.PasswordChanged = false;
                    await user.save();
                    return { success: false, message: 'Contact HR' };

                }
                user.Attempts = user.Attempts + 1;
                await user.save();
            }
        }
        return { success: false };
    } catch (error) {
        // console.error('Error processing request:', error)
        return { success: false };
    }
}
//Logout
const logout = async ({ SessionID, UserID }) => {
    try {
        const existingSession = await UserSession.findOne({ where: { SessionID: SessionID, UserID: UserID } });
        if (existingSession) {
            existingSession.SessionEndDateTime = new Date();
            await existingSession.save();
            return { success: true };
        }
        return { success: false };

    } catch (error) {
        //console.error('Error processing request:', error)
        return { success: false };
    }
}
//Function to change Password
const changePassword = async ({ UserID, Password }) => {
    try {
        const user = await User.findOne({ where: { UserID: UserID } });
        if (!user) {
            return { success: false };
        }
        const hashedPassword = await hashPassword(Password);
        user.Password = hashedPassword;
        user.UpdatedBy = UserID;
        user.PasswordChanged = true;
        await user.save();

        return { success: true };
    } catch (error) {
        //console.error('Error processing request:', error)
        return { success: false };
    }
}


const fetchALlActiveUser = async () => {
    try {
        const activeUser = await User.findAll({
            where: { Active: true },
            attributes: { exclude: ['Password'] }
        });

        return { success: true, data: activeUser };
    } catch (error) {
        //console.error('Error processing request:', error)
        return { success: false };
    }
}
const fetchTheUserWhoIsFilledThePreOnboardinForm = async ({ UserID }) => {
    try {
        //console.log(UserID);
        const isSubmitteddata = await PersonalDetails.findOne({
            where: { Submitted: true, UserID: UserID },

        });
        //console.log(isSubmitteddata);
        if (isSubmitteddata) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        // console.error('Error processing request:', error)
        return { success: false };
    }
}

const getUserByUserID = async ({ UserID }) => {
    try {
        const UserDetails = await User.findOne({
            where: { UserID: UserID },
            attributes: { exclude: ['Password'] }
        })
        //console.log(UserDetails);
        if (UserDetails) {
            return { success: true, UserDetails };
        }
        return { success: false };
    } catch (error) {
        return { success: false };
    }
}

const getUserFormsDetails = async ({ UserID }) => {
    try {
        const personalDetails = await PersonalDetails.findOne({
            where: {
                UserID: UserID
            }
        });
        //console.log(personalDetails);

        const previousWorkTran = await PreviousWorkTran.findAll({
            where: {
                UserID: UserID
            }
        });
        const educationTran = await EducationTran.findAll({
            where: {
                UserID: UserID
            }
        });

        const previousGyanSysEmployeeDetails = await PreviousGyanSysEmployeeDetails.findOne({ where: { UserID: UserID } });
        const onSiteProjectTran = await OnSiteProjectTran.findOne({ where: { UserID: UserID } });
        const certificationTran = await CertificationTran.findAll({ where: { UserID: UserID } });
        const skills=await Skills.findAll({where:{UserID:UserID}});
        // const documents=await DocumentTran.findAll({where:{UserID:UserID}});
        const documents = await DocumentTran.findAll({
            where: { UserID: UserID },
            include: [{
                model: DocumentTypeMaster,
                as: 'DocumentTypeMaster', // Use the alias here
                attributes: ['DocType'],
            }]
        });
 
        const formattedDocuments = documents.map(doc => ({
            ...doc.toJSON(),
            DocType: doc.DocumentType ? doc.DocumentType.DocType : null // Include the associated DocType name
        }));
        const formData = { "formData": { personalDetails, "previousWorkTran": previousWorkTran, "educationTran": educationTran, "previousGyanSysEmployeeDetails": previousGyanSysEmployeeDetails, "onSiteProjectTran": onSiteProjectTran,"skills":skills, "certificationTran": certificationTran,"documents":formattedDocuments } };

        if (personalDetails || previousWorkTran || educationTran) {
            return { success: true, formData: formData };
        }
        else {
            return { success: false, message: "No Details found" };
        }

    } catch (error) {
        //console.error(error);
        return { success: false, message: "Something went wrong" };
    }
}

module.exports = {
    sendPasswordEmail,
    getUserFormsDetails,
    getUserByUserID,
    fetchTheUserWhoIsFilledThePreOnboardinForm,
    fetchALlActiveUser,
    changePassword,
    logout,
    sendForgetCode,
    login

}