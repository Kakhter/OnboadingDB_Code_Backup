const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const ClientMaster = sequelize.define('ClientMaster', {
    ClientID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ClientName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ClientType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'ClientMaster',
    timestamps: false
});

module.exports = ClientMaster;