const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const PreviousWork = sequelize.define('PreviousWork', {
    PreviousWorkID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'UserID',
        },
        onDelete: 'CASCADE',
    },
    CompanyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EmploymentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DesignationName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Currency:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Compensation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    HRName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    HRMobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    HRTelePhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    HREmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ReportingManagerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingManagerMobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingManagerTelePhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingManagerEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingManagerDesignation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingManagerEmpID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ReportingStartDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ReportingEndDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Responsibilities:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ExpectedDocSubmitDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    DocID:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull:true
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
    tableName: 'PreviousWorkTran',
    timestamps: false
});

module.exports = PreviousWork;