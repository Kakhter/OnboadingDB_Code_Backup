

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//const State = require('./stateModel'); // Import after defining
const City = sequelize.define('City', {
  CityID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  StateID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'StateMaster', 
      key: 'StateID'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'CityMaster',
  timestamps: false
});

module.exports = City;
