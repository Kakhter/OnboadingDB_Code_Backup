const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const EventTypeMaster = require('./eventTypeMasterModel');

const AuditLog = sequelize.define('AuditLog', {
    EventID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    EventDateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
    EventTypeID: {
        type: DataTypes.INTEGER,
        references: {
            model: EventTypeMaster,
            key: 'EventTypeID',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    }
}, {
    timestamps: false,
    tableName: 'AuditLog',
});
AuditLog.belongsTo(User, { foreignKey: 'UserID', as: 'User' });
AuditLog.belongsTo(EventTypeMaster, { foreignKey: 'EventTypeID', as: 'EventTypeMaster' });
module.exports = AuditLog;