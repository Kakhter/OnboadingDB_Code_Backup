
const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');
 
const EmploymentType = sequelize.define('EmploymentType', {
    EmploymentTypeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EmploymentTypeDesc: {
        type: DataTypes.STRING,
        allowNull: false,unique:true,
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
    tableName: 'EmploymentTypeMaster',
    timestamps: false
});
 
module.exports = EmploymentType;