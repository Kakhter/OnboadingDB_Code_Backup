const Role = require('./roleModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const DocumentTypeMaster = require('./documentTypeMasterModel');

const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    RoleID: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'RoleID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    Attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    PasswordChanged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    DOJ: {
        type: DataTypes.DATE,
    },
    CandidateID: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
    },
    DocTypeID: {
        type: DataTypes.INTEGER,
        references: {
            model: DocumentTypeMaster,
            key: 'DocTypeID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    IDNumber: {
        type: DataTypes.STRING,
       // unique: true
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
    tableName: 'Users'
});

User.belongsTo(Role, { foreignKey: 'RoleID', as: 'Role' });
User.belongsTo(DocumentTypeMaster, { foreignKey: 'DocTypeID', as: 'DocumentTypeMaster' });

module.exports = User;