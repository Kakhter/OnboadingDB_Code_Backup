// models/personalDetails.js
const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const City = require('./cityModel');
const State = require('./stateModel');
const Country = require('./countryMasterModel');

const PersonalDetails = sequelize.define('PersonalDetails', {
    PersonalDetailsID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'UserID',
        },
        onDelete: 'CASCADE',
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MiddleName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    BirthCountryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'CountryID',
        },
        onDelete: 'CASCADE',
    },
    BloodGroup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MaritalStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false
    },
    BirthPlaceCityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'CityID',
        },
        onDelete: 'CASCADE',
    },
    BirthStateID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: 'StateID',
        },
        onDelete: 'CASCADE',
    },
    Nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PanNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    AadharNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Submitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Remarks:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Accepted:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    Rejected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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
      
    PermanentAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CurrentAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    PassportNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },


}, {
    tableName: 'PersonalDetails',
    timestamps: false,
});

PersonalDetails.belongsTo(User, {
    foreignKey: 'UserID',
    as: 'User',
});

module.exports = PersonalDetails;
