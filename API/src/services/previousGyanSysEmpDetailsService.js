// services/previousGyanSysEmployeeDetailsService.js
const { where } = require('sequelize');
const PreviousGyanSysEmployeeDetails = require('../models/previousGyanSysEmpDetailsModel');

const getAll = () => {
    return PreviousGyanSysEmployeeDetails.findAll();
};

const getByUserId = (id) => {
    return PreviousGyanSysEmployeeDetails.findOne(
        {where:{
            UserID:id
        }}
    );
};

const create = async (data) => {
    try {
        data.CreatedDate = new Date();
        data.UpdatedDate = new Date();
        const existingUserID = await PreviousGyanSysEmployeeDetails.findOne({
            where: {
                UserID: data.UserID
            }
        });
        if (existingUserID) {
            return {
                message: "UserID is already used"
            };
        }
        const newRecord = await PreviousGyanSysEmployeeDetails.create(data);
        return {
            data: newRecord
        };
    } catch (error) {
        console.error('Error creating record:', error);
        return {
            message: "Error in creating record"
        };
    }
};


const update = (id, data) => {
    data.UpdatedDate=new Date;
    return PreviousGyanSysEmployeeDetails.update(data, {
        where: { UserID: id }
    });
};

const deleteById = (id) => {
    return PreviousGyanSysEmployeeDetails.destroy({
        where: { UserID: id }
    });
};

module.exports = {
    getAll,
    getByUserId,
    create,
    update,
    deleteById
};
