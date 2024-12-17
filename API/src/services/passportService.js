// services/passportTranService.js
const PassportTran = require('../models/passportTranModels');
const {
    Op,
    where
} = require('sequelize');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const sendEmailNotification = async (email, subject, text) => {
    // Configure your email service (SMTP, SendGrid, etc.)
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        // auth: {
        //     user: 'onboardingapp2024@outlook.com',
        //     pass: 'White@01'
        // }
        service: 'gmail',  
        auth: {
            user: 'gyansysonboarding@gmail.com',
            pass: 'lkggbneaqfoxoirc'
        }
    });

    let mailOptions = {
        from: 'onboardingapp2024@outlook.com',
        to: email,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};

const checkAndMoveExpiredPassport = async () => {
    const now = new Date().toISOString();
    // Find expired passports
    const expiredPassports = await PassportTran.findAll({
        where: {
            PassportExpiry: {
                [Op.lt]: now
            }
        }
    });

    // Move expired passports to old passport details
    for (const passport of expiredPassports) {
        await passport.update({
            OldPassportNo: passport.PassportNumber,
            OldPassportIssueDate: passport.PassportIssueDate,
            OldPassportIssuedAtCityID: passport.PassportIssuedAtCityID,
        });

        // Notify the user
        const user = await User.findOne({
            where: {
                UserID: passport.UserID
            }
        });
        const email = user.Email;
        await sendEmailNotification(
            email,
            'Passport Expiry Notification',
            `Dear ${user.FirstName},\n\nYour passport has expired. Please update your passport details.\n\nThank you.`
        );
    }
};

// Validate if the new passport number is the same as the old passport number
const isNewPassportNumberValid = async (userId, newPassportNumber) => {
    const passport = await PassportTran.findOne({
        where: {
            UserID: userId
        }
    });

    if (passport && (passport.PassportNumber === newPassportNumber || passport.OldPassportNo === newPassportNumber)) {
        return false; // Invalid, as the new passport number matches old or existing passport number
    }
    return true;
};

const createPassportTran = async (data) => {
    data.CreatedDate = new Date();
    data.UpdatedDate = new Date();

    // Check and move expired passports
    await checkAndMoveExpiredPassport();

    return await PassportTran.create(data);
};

const getAllPassportTrans = async () => {
    return await PassportTran.findAll();
};

const getPassportTranByUserId = async (userId) => {
    return await PassportTran.findOne({
        where: {
            UserID: userId
        }
    });
};

const updatePassportTran = async (userId, data) => {
    data.UpdatedDate = new Date();

    if (!await isNewPassportNumberValid(userId, data.PassportNumber)) {
        throw new Error('The new passport number cannot be the same as the old passport number.');
    }

    const record = await PassportTran.findOne({
        where: {
            UserID: userId
        }
    });
    if (record) {
        return await record.update(data);
    }
    return null;
};

const deletePassportTran = async (userId) => {
    const record = await PassportTran.findOne({
        where: {
            UserID: userId
        }
    });
    if (record) {
        return await record.destroy();
    }
    return null;
};

module.exports = {
    createPassportTran,
    getAllPassportTrans,
    getPassportTranByUserId,
    updatePassportTran,
    deletePassportTran,
    checkAndMoveExpiredPassport
};
