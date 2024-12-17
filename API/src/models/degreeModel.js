

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Degree = sequelize.define('Degree', {
  DegreeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  DegreeName: {
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
  tableName: 'DegreeMaster',
  timestamps: false
});
module.exports = Degree;
