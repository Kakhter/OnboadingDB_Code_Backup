const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const DocumentTypeMaster = require('./documentTypeMasterModel');
const User = require('./userModel');
const PreviousWork = require('./previousWorkTranModel')

const DocumentTran = sequelize.define('DocumentTran', {
    DocID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DocScanned: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IDNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: {
        //     msg: 'IDNumber must be unique. This IDNumber already exists.'
        // }
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
    DocTypeID: {
        type: DataTypes.INTEGER,
        references: {
            model: DocumentTypeMaster,
            key: 'DocTypeID',
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
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        allowNull: true,
    },
    PreviousWorkID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PreviousWork,
            key: 'PreviousWorkID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    timestamps: false,
    tableName: 'DocumentTran',
});
DocumentTran.belongsTo(User, { foreignKey: 'UserID', as: 'User' });
DocumentTran.belongsTo(DocumentTypeMaster, { foreignKey: 'DocTypeID', as: 'DocumentTypeMaster' });

module.exports = DocumentTran;