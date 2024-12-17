
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const SKill = sequelize.define('Skill', {
    SkillID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Skills: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'UserID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
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
    tableName: 'Skills'
});

SKill.belongsTo(User, { foreignKey: 'UserID', as: 'User' });

module.exports = SKill;