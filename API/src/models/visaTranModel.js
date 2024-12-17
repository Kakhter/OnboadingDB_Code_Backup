const Role = require('./roleModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PassportTran = require('../models/passportTranModels');
const CountryMaster = require('../models/countryMasterModel');

const VisaTran = sequelize.define('VisaTran', {
    VisaID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    VisaType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    VisaCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    VisaSponsor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    VisaIssueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    VisaExpiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    VisaIssuedAt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DurationOfStay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    NumberOfEntry: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PassportID: {
        type: DataTypes.INTEGER,
        references: {
            model: PassportTran,
            key: 'PassportID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    CountryID: {
        type: DataTypes.INTEGER,
        references: {
            model: CountryMaster,
            key: 'CountryID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        onUpdate: new Date(),
    }
}, {
    timestamps: false,
    tableName: 'VisaTran'
});

VisaTran.belongsTo(PassportTran, { foreignKey: 'PassportID', as: 'PassportTran' });
VisaTran.belongsTo(CountryMaster, { foreignKey: 'CountryID', as: 'CountryMaster' });

module.exports = VisaTran;