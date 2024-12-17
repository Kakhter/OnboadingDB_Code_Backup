


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const CountryMaster = require('./countryMasterModel');
const StateMaster = require('./stateModel');
const CityMaster = require('./cityModel');
const User = require('./userModel');


const ContactTrans = sequelize.define('ContactTrans', {
  ContactID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
        model: User,
        key: 'UserID',
    },
  },
  AddressType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Address1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Address2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Address3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CityID: {
    type: DataTypes.INTEGER,
    references: {
      model: CityMaster,
      key: 'CityID',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  StateID: {
    type: DataTypes.INTEGER,
    references: {
      model: StateMaster,
      key: 'StateID',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  CountryID: {
    type: DataTypes.INTEGER,
    references: {
      model: CountryMaster,
      key: 'CountryID',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  PostalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  MobileNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  LandlineSTDCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  LandLineNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  UpdatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'ContactTrans',
  timestamps: false, 
});

// Associations
// ContactTrans.belongsTo(CountryMaster, { foreignKey: 'CountryID' });
// ContactTrans.belongsTo(StateMaster, { foreignKey: 'StateID' });
// ContactTrans.belongsTo(CityMaster, { foreignKey: 'CityID' });
// ContactTrans.belongsTo(User, { foreignKey: 'UserID' });

ContactTrans.belongsTo(CountryMaster, { foreignKey: 'CountryID' });
ContactTrans.belongsTo(StateMaster, { foreignKey: 'StateID' });
ContactTrans.belongsTo(CityMaster, { foreignKey: 'CityID' });
ContactTrans.belongsTo(User, { foreignKey: 'UserID' });

module.exports = ContactTrans;

