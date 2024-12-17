
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const User = require('./userModel'); // Import User model if it's used for UserID
// const Level = require('./levelModel'); // Import Level model if it's used for LevelID
// const Country = require('./countryMasterModel'); // Import Country model if it's used for CountryID
// const State = require('./stateModel'); // Import State model if it's used for StateID
// const Degree = require('./degreeModel'); // Import Degree model if it's used for DegreeID
// const Branch = require('./branchModel'); // Import Branch model if it's used for BranchID

// const Education = sequelize.define('Education', {
//   EducationID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   UserID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'UserID'
//     }
//   },
//   LevelID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Level,
//       key: 'LevelID'
//     }
//   },
//   CountryID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Country,
//       key: 'CountryID'
//     }
//   },
//   StateID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: State,
//       key: 'StateID'
//     }
//   },
//   BoardORUniversity: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   // University: {
//   //   type: DataTypes.STRING,
//   //   allowNull: true,
//   // },
//   InstituteName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   DegreeID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: Degree,
//       key: 'DegreeID'
//     }
//   },
//   BranchID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: Branch,
//       key: 'BranchID'
//     }
//   },
//   PassedOn: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   PercentageMarks: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   CGPA: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   CreatedBy: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   CreatedDate: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     defaultValue: DataTypes.NOW,
//   },
//   UpdatedBy: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   UpdatedDate: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     defaultValue: DataTypes.NOW,
//   }
// }, {
//   tableName: 'EducationMaster',
//   timestamps: false,
// });

// // Define relationships if necessary
// Education.belongsTo(User, { foreignKey: 'UserID' });
// Education.belongsTo(Level, { foreignKey: 'LevelID' });
// Education.belongsTo(Country, { foreignKey: 'CountryID' });
// Education.belongsTo(State, { foreignKey: 'StateID' });
// Education.belongsTo(Degree, { foreignKey: 'DegreeID' });
// Education.belongsTo(Branch, { foreignKey: 'BranchID' });

// module.exports = Education;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./userModel'); 
const Country = require('./countryMasterModel'); 
const State = require('./stateModel'); 

const Education = sequelize.define('Education', {
  EducationID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
            model: User,
            key: 'UserID',
          },

  },
  CountryID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Country,
      key: 'CountryID',
    },

  },
  StateID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
            model: State,
            key: 'StateID',
          },
  },
  BoardORUniversity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  InstituteName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Degree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Branch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PassedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  PercentageMarks: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  CGPA: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  UpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  UpdatedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  EducDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Submitted: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false
// },
}, {
  tableName: 'EducationTran',
  timestamps: false,
});

module.exports = Education;
