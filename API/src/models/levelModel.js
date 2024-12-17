
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Level = sequelize.define('Level', {
  LevelID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  LevelDesc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  UpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  UpdatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'LevelMaster',
  timestamps: false
});
module.exports = Level;
