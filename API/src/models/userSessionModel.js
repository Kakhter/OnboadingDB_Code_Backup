const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const UserSession = sequelize.define('UserSession', {
    SessionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    SessionStartDateTime: {
        type: DataTypes.DATE,
    },
    SessionEndDateTime: {
        type: DataTypes.DATE,
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'UserID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    }
}, {
    timestamps: false,
    tableName: 'UserSessions',
});

UserSession.belongsTo(User, { foreignKey: 'UserID', as: 'User' });
module.exports = UserSession;