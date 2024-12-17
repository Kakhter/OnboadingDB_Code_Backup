
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const State = sequelize.define('State', {
  StateID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  StateName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CountryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CountryMaster', 
      key: 'CountryID'
    }
  }
}, {
  tableName: 'StateMaster',
  timestamps: false
});
module.exports = State;
