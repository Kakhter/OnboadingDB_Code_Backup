const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const Designation = sequelize.define('Designation', {
    DesignationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    DesignationDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    tableName: 'DesignationMaster'
});

module.exports = Designation;