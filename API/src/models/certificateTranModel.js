// models/certificateModel.js
const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Certificate = sequelize.define('Certificate', {
    CertificateID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    CertificateName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CertificateLink: {
        type: DataTypes.STRING
    },
   
    IssuedBy: {
        type: DataTypes.STRING
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
        type: DataTypes.INTEGER
    },
    UpdatedDate: {
        type: DataTypes.DATE
    },
    Skills: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'CertificateTran'
});

module.exports = Certificate;