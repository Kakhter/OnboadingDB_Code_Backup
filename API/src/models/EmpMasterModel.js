const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const ClientMaster = require('./clientMasterModel');

const EmpMaster = sequelize.define('EmpMaster', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    EmpID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    EmpName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GyanSysEmailID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    ClientID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ClientMaster,
            key: "ClientID"
        },
        onDelete: 'CASCADE'
    },
    PracticeName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    AccountDeliveryManagerEmpID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    NPS: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    PRAN_No: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    },
    FoodCard: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    GMCGPA: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    EmploymentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RepliconCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    ConfirmationDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ConfirmedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
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
    tableName: 'EmpMaster',
    timestamps: false
});

module.exports = EmpMaster;