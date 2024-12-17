const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed
const User=require('./userModel');
const Replicon = sequelize.define('Replicon', {
  RepliconID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:User,
        key:'UserID'
    }
  },
  RepliconSystemID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  RepliconComments: {
    type: DataTypes.STRING,
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
    allowNull: true
  },
  UpdatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'RepliconMaster',
  timestamps: false
});

module.exports = Replicon;
