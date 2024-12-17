const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const PracticeMaster = sequelize.define('PracticeMaster', {
    PracticeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    PracticeType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PracticeDesc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PracticeManagerIDUS: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    PracticeManagerIDIN: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    tableName: 'PracticeMaster',
    timestamps: false
});

module.exports = PracticeMaster;