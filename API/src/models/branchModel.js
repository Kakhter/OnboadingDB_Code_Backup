
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Branch = sequelize.define('Branch', {
  BranchID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  BranchName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  DegreeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'DegreeMaster', 
      key: 'DegreeID'
    }
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
  tableName: 'BranchMaster',
  timestamps: false
});
module.exports = Branch;
