// models/passportTran.js
const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const City = require('./cityModel');
const State = require('./stateModel');
const Country = require('./countryMasterModel');

const PassportTran = sequelize.define('PassportTran', {
    PassportID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    PassportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    PassportDOB: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PassportGender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FatherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    MotherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    LegalGuardianName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    SpouseName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PassportPlaceOfBirth: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PassportIssueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PassportExpiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PassportIssuedAtCityID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City,
            key: 'CityID',
        },
        onDelete: 'CASCADE',
    },
    CountryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'CountryID',
        },
        onDelete: 'CASCADE',
    },
    StateID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: 'StateID',
        },
        onDelete: 'CASCADE',
    },
    OldPassportNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    OldPassportIssueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    OldPassportIssuedAtCityID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City,
            key: 'CityID',
        },
        onDelete: 'SET NULL',
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'PassportTran',
    timestamps: false,
});

PassportTran.belongsTo(User, {
    foreignKey: 'UserID',
    as: 'User',
});

module.exports = PassportTran;