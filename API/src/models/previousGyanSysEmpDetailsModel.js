const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const EmpMaster = require('./EmpMasterModel');
const PreviousGyanSysEmployeeDetails = sequelize.define('PreviousGyanSysEmployeeDetails', {
    PreviousGyanSysEmployeeDetailsID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    PreviousGyanSysEmpID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        references:{
            model:EmpMaster,
            key:"EmpID"
        }
    },
    UserID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        references:{
            model:User,
            key:"UserID"
        }
    },
    DesignationWhileRelieving: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DesignationWhileRelieving: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DateOfRelieving: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Submitted: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false
    // },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'PreviousGyanSysEmployeeDetails',
    timestamps: false
});

module.exports = PreviousGyanSysEmployeeDetails;