const userService = require('../services/userService');
// const { addToBlacklist, getAllBlackListed } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const DocumentTranController = require('../controllers/documentTranController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// // send OTP code via email
// exports.sendCode = async (req, res) => {
//     const { FirstName, MiddleName, LastName, Email, RoleID, DOJ, DocTypeID, IDNumber, CandidateID } = req.body;
//     try {
//         // Send code and get response
//         const CurrentUserID = req.user.UserID;
//         const response = await userService.sendCode({ FirstName, MiddleName, LastName, Email, RoleID, CurrentUserID, DOJ, DocTypeID, IDNumber, CandidateID });
//         if (response.success) {
//             req.UserID = response.data.UserID;

//             // If there is a file to upload
//             if (req.file) {
//                 try {
//                     const uploadDocument = await new Promise((resolve) => {
//                         const reqMock = { ...req, body: req.body, file: req.file, UserID: req.UserID };
//                         const resMock = {
//                             status: (statusCode) => ({
//                                 json: (response) => {
//                                     resolve({ statusCode, ...response });
//                                 }
//                             })
//                         };
//                         DocumentTranController.createDocumentTran[1](reqMock, resMock);
//                     });
//                     console.log(uploadDocument);
//                     // Handle document upload response
//                     if (uploadDocument.statusCode === 400) {
//                         return res.status(400).json({ message: uploadDocument.message || 'Failed to upload document.' });
//                     } else if (uploadDocument.statusCode === 500) {
//                         return res.status(500).json({ message: 'Otp Sent but Failed to upload document.' });

//                     } else {
//                         return res.status(200).json({ message: 'OTP code sent and document uploaded successfully. Please check your email.' });
//                     }

//                 } catch (error) {
//                     // Handle errors that occur during the promise handling
//                     return res.status(500).json({ message: 'An unexpected error occurred during document upload.' });
//                 }
//             } else {
//                 // No file to upload
//                 return res.status(200).json({ message: 'OTP code sent successfully. Please check your email.' });
//             }
//         } else {
//             // Failed to send OTP code
//             return res.status(400).json({ message: response.message });
//         }

//     } catch (error) {
//         // Handle general errors
//         if (error.statusCode === 400) {
//             return res.status(400).json({ message: 'IDNumber must be unique. This IDNumber already exists.' });
//         }
//         return res.status(500).json({ message: 'Failed to process request. Please try again later.' });
//     }
// };


const sequelize = require('../config/db')
// const sendPasswordEmail = require('../services/userService'); // Adjust path as needed
const { generateRandomCode, hashPassword } = require('../utils/helpers'); // Adjust path as needed

// Function to handle sending the random code and document upload
exports.sendCode = async (req, res) => {
    const { FirstName, MiddleName, LastName, Email, RoleID, DOJ, DocTypeID, IDNumber, CandidateID } = req.body;
    const CurrentUserID = req.user.UserID;

    let transaction;
    let docTransaction;

    try {
        transaction = await sequelize.transaction();

        // Validate input
        var validateInput ='';

        if (!Email ) {
            //await transaction.rollback();
            validateInput= "Email";
        }

        if (!FirstName ) {
           // await transaction.rollback();
            validateInput= validateInput + " " +"First Name";
        }

        if (!LastName ) {
           // await transaction.rollback();
           validateInput= validateInput + " " +"Last Name";
        }

        if ( !DocTypeID) {
           // await transaction.rollback();
            validateInput= validateInput + " " +"DocTypeID";
        }

        if (!IDNumber) {
            //await transaction.rollback();
            validateInput= validateInput + " " +"IDNumber";
        }

        if (validateInput)
        {
            await transaction.rollback();
            return res.status(400).json({ message:"Invalid row: " + validateInput + " required."  });
        }

        const randomCode = generateRandomCode();
        const hashedPassword = await hashPassword(randomCode);
        const fullName = `${FirstName} ${MiddleName || ''} ${LastName}`;

        let user = await User.findOne({ where: { Email: Email }, transaction });

        if (!user) {
            user = await User.create({
                FirstName,
                MiddleName,
                LastName,
                Email,
                Password: hashedPassword,
                RoleID: RoleID || 1,
                DOJ,
                DocTypeID,
                IDNumber,
               // CandidateID,
                CreatedDate: new Date(),
                CreatedBy: CurrentUserID
            }, { transaction });
        } else if (!user.Active) {
            user.Password = hashedPassword;
            user.Attempts = 0;
            user.UpdatedBy = CurrentUserID;
            user.IDNumber = IDNumber || user.IDNumber;
            user.DOJ = DOJ || user.DOJ;
            user.DocTypeID = DocTypeID || user.DocTypeID;
          //  user.CandidateID = CandidateID || user.CandidateID;
            await user.save({ transaction });
        } else {
            await transaction.rollback();
            return res.status(400).json({ message: 'User already exists.' });
        }

        if (req.file) {
            try {
                docTransaction = await sequelize.transaction();

                const reqMock = { ...req, body: req.body, file: req.file, UserID: user.UserID };
                const resMock = {
                    status: (statusCode) => ({
                        json: (response) => ({
                            statusCode,
                            ...response
                        })
                    })
                };

                const uploadDocument = await new Promise((resolve, reject) => {
                    DocumentTranController.createDocumentTran[1](reqMock, resMock)
                        .then((result) => resolve(result))
                        .catch(() => reject({ statusCode: 500, message: 'Error uploading document' }));
                });
                //console.log(uploadDocument);
                const successStatusCode = [200, 201];
                //console.log(successStatusCode.includes(uploadDocument.statusCode));
                if (!successStatusCode.includes(uploadDocument.statusCode)) {
                    await docTransaction.rollback();
                    await transaction.rollback();
                    return res.status(uploadDocument.statusCode).json({ message: uploadDocument.message || 'Failed to upload document.' });
                }


                const emailSent = await userService.sendPasswordEmail(Email, fullName, randomCode);
                //console.log(emailSent);
                if (!emailSent) {
                    return res.status(500).json({ message: 'Failed to send OTP email.' });
                }

                await docTransaction.commit();
                await transaction.commit();
                return res.status(200).json({ message: 'OTP code sent and document uploaded successfully. Please check your email.' });

            } catch (error) {
                if (docTransaction) {
                    await docTransaction.rollback();
                }
                if (transaction) {
                    await transaction.rollback();
                }
                return res.status(500).json({ message: 'An unexpected error occurred during document upload.' });
            }
        } else {
            const emailSent = await userService.sendPasswordEmail(Email, fullName, randomCode);
            if (!emailSent) {
                await transaction.rollback();
                return res.status(500).json({ message: 'Failed to send OTP email.' });
            }

            await transaction.commit();
            return res.status(200).json({ message: 'OTP code sent successfully. Please check your email.' });
        }

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Invalid row: Failed to process request. Please try again later. ' + error });
    }
};




// Login
exports.login = async (req, res) => {
    const { Email, Password } = req.body;
    //console.log(Email, Password);
    try {
        const response = await userService.login({ Email, Password });
        if (response.success) {
            res.status(200).json({
                message: 'Logged in successfully',
                token: response.token,
                data: response.data
            });
        } else if (response.message) {
            res.status(403).json({ message: response.message });
        } else {
            res.status(401).json({ message: 'Email or Password is Invalid' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
};

//  Change Password
exports.changePassword = async (req, res) => {
    const { Password } = req.body;
    const { UserID } = req.user;
    try {
        const response = await userService.changePassword({ UserID, Password });
        if (response.success) {
            await userService.logout({ SessionID: req.user.SessionID, UserID });
            // addToBlacklist(req.token);
            res.status(200).json({ message: 'Password changed successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to change password.' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
};

// Logout
exports.logout = async (req, res) => {
    //const { SessionID, UserID } = req.body;
    try {
        // console.log("logout end point", req.user.SessionID);
        const { SessionID, UserID } = req.user;
        const response = await userService.logout({ SessionID, UserID });
        // console.log(getAllBlackListed());

        // addToBlacklist(req.token)
        // console.log(getAllBlackListed());
        if (response.success) {
            res.status(200).json({ message: 'Logged out successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to logout. Please try again.' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
};

// send OTP code via email if reset password is needed
exports.sendForgetCode = async (req, res) => {
    const { Email } = req.body;

    try {
        const response = await userService.sendForgetCode({ Email });
        if (response.success) {
            res.status(200).json({ message: 'OTP code sent successfully. Please check your email.' });
        } else {
            res.status(400).json({ message: 'Failed to send OTP code. User may not be registered.' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
};

exports.fetchALlActiveUser = async (req, res) => {
    try {
        const response = await userService.fetchALlActiveUser();
        if (response.success) {

            res.status(200).json({ data: response.data });
        } else {
            res.status(400).json({ message: 'Failed to Load data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
}


exports.fetchTheUserWhoIsFilledThePreOnboardinForm = async (req, res) => {
    try {
        const { UserID } = req.user;
        const response = await userService.fetchTheUserWhoIsFilledThePreOnboardinForm({ UserID });
        if (response.success) {
            res.status(200).json({ message: 'User has already filled the form', data: { submitted: true } });
        } else {
            res.status(400).json({ message: 'User need to fill the form', data: { submitted: false } });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
}

exports.getUserByUserID = async (req, res) => {
    try {
        const UserID = req.params.id;
        const response = await userService.getUserByUserID({ UserID });
        if (response.success) {
            res.status(200).json(response.UserDetails);
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });

    }
};

//all details form field by the user 
exports.getUserFormsDetails = async (req, res) => {
    try {
        const UserID = parseInt(req.params.id, 10);
        const response = await userService.getUserFormsDetails({ UserID });
        if (response.success) {
            res.status(200).json(response.formData);
        } else {
            res.status(400).json(response.message);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });

    }
}

//New Code by Khalid to get user Photo
exports.getUserPhoto = async (req, res) => {
    try {
        const UserID = parseInt(req.params.id, 10);
        const response = await userService.getUserPhoto({ UserID });
        if (response.success) {
            res.status(200).json(response.formData);
        } else {
            res.status(400).json(response.message);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request. Please try again later.' });
    }
}