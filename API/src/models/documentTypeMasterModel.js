const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DocumentTypeMaster = sequelize.define('DocumentTypeMaster', {
    DocTypeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DocType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        allowNull: true,
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'DocumentTypeMaster',
});
module.exports = DocumentTypeMaster;