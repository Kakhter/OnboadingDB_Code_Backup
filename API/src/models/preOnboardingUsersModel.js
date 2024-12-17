const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PreOnBoardingUser = sequelize.define('PreOnBoardingUser', {
  PreOnBoardingUserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CandidateID:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:true
  },
  FirstName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  MiddleName:{
    type:DataTypes.STRING,
    allowNull:true
  },
  LastName:{
    type:DataTypes.STRING,
    allowNull:true
  },
  Email:{
    type:DataTypes.STRING,
    allowNull:true,
    unique:true
  },
  DOJ:{
    type:DataTypes.DATE,
    allowNull:true
  },
  DocType:{
    type:DataTypes.STRING,
    allowNull:true
  },
  IDNumber:{
    type:DataTypes.STRING,
    allowNull:true,
    unique:true
  },
  Status:{
    type:DataTypes.STRING,
    allowNull:true
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
  tableName: 'PreOnBoardingUser',
  timestamps: false
});
module.exports = PreOnBoardingUser;
