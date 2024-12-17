// models/projectModel.js
const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Project = sequelize.define('Project', {
    ProjectID: {
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
    ProjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProjectDetails: {
        type: DataTypes.STRING,
        allowNull: false
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
    timestamps: false,
    tableName: 'OnSiteProjectTran'
});

module.exports = Project;