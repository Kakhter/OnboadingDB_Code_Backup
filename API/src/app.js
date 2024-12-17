const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
const cors = require('cors');

//models
const User = require('./models/userModel');
const Role = require('./models/roleModel');
const UserSession = require('./models/userSessionModel');
const DocumentTypeMaster = require('./models/documentTypeMasterModel');
const DocumentTran = require('./models/documentTranModel');
const EventTypeMaster = require('./models/auditLogModel');
const PersonalDetails = require('./models/personalDetailsModel');
const passport = require('./models/passportTranModels');
const AuditLog = require('./models/auditLogModel');
const designation = require('./models/DesignationMasterModel');
const onSiteProject = require('./models/onSiteProjectModel');
const certificate = require('./models/certificateTranModel');
const previousWork = require('./models/previousWorkTranModel');
const visaTran = require('./models/visaTranModel');
const clientMaster = require('./models/clientMasterModel');
const empMaster = require("./models/EmpMasterModel");
const replicon = require('./models/repliconMasterModel');
const previousGyanSysEmp = require("./models/previousGyanSysEmpDetailsModel");

const Skill = require("./models/skillModel");

const preOnBoardingUser=require('./models/preOnboardingUsersModel');



//Routes
const userRoutes = require('./routes/userRoutes');
const documentTypeMasterRoutes = require('./routes/documentTypeMasterRoutes');
const documentTranRoutes = require('./routes/documentTranRoutes');
const eventTypeMasterRoutes = require('./routes/eventTypeMasterRoutes');
const visaTranRoutes = require('./routes/visaTranRoutes');

const personalDetailsRoutes = require('./routes/personalDetailsRoutes');
const passportRoutes = require('./routes/passportRoutes');
const designationRoutes = require('./routes/designationMasterRoutes');
const onSiteProjectRoutes = require('./routes/onSiteProjectRoutes');
const certificateRoutes = require('./routes/certificateTranRoutes');
const previousWorkRoutes = require('./routes/previousWorkTranRoutes');
const clientMasterRoutes = require('./routes/clientMasterRoutes');
const empMasterRoutes = require("./routes/empRoutes");
const previousGyanSysEmpRoutes = require("./routes/previousGyanSysEmpDetailsRoutes");

const skillsRoutes = require("./routes/skillRoutes");

const preOnBoardingUserRoutes=require('./routes/preOnboardingUsersRoutes');
const userFormsRoutes=require('./routes/userFormsRoutes');

//09-08-2024

const countryRoutes = require('./routes/countryRoute');
const Country = require('./models/countryMasterModel');

const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');

//14-08-2024
const Contact = require('./models/contactTranModel');
const contactRoutes = require('./routes/contactTranRoutes');

const education = require('./models/educationModel');
const educationRoutes = require('./routes/educationRoutes');

const EmploymentType = require('./models/employmentTypeMasterModel');
const employmenttypeRoute = require('./routes/employmentTypeRoutes');

const Degree = require('./models/degreeModel');
const degreeRoutes = require('./routes/degreeRoutes');

const Branch = require('./models/branchModel');
const branchRoutes = require('./routes/branchRoutes');

const Level = require('./models/levelModel');
const levelRoutes = require('./routes/levelRoutes');


const app = express();
require('./utils/passportCronJob');
const PORT = config.port;

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/documentTypeMaster', documentTypeMasterRoutes);
app.use('/documentTran', documentTranRoutes);
app.use('/eventTypeMaster', eventTypeMasterRoutes);



app.use('/countries', countryRoutes);
app.use('/personaldetails', personalDetailsRoutes);
app.use('/passports', passportRoutes);
app.use('/designations', designationRoutes);
app.use('/onsiteprojects', onSiteProjectRoutes);
app.use('/certificates', certificateRoutes);
app.use('/previousworks', previousWorkRoutes);
app.use('/visaTran', visaTranRoutes);
app.use('/clientMaster', clientMasterRoutes);
app.use("/employees", empMasterRoutes);
app.use("/previousGyanSysEmps", previousGyanSysEmpRoutes);
app.use("/preonboardingusers",preOnBoardingUserRoutes);
app.use("/userforms",userFormsRoutes);



app.use('/levels', levelRoutes);
app.use('/contacttran', contactRoutes);
app.use('/branch', branchRoutes);
app.use('/degrees', degreeRoutes);
app.use('/edu', educationRoutes);
app.use('/employmentType', employmenttypeRoute);
app.use('/skills', skillsRoutes);

app.use('/states', stateRoutes);
app.use('/cities', cityRoutes);

app.use(errorHandler);
// Sync database for all models
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synchronized');
// }).catch(err => {
//   console.error('Error syncing database:', err);
// });

//Sync database for single model or more

// const syncSpecificModels = async () => {
//   try {
//     // Sync only the User model
//     // await User.sync({ alter: true });
//     // await Role.sync({ alter: true });
//     // await UserSession.sync({ alter: true });
//     // await DocumentTypeMaster.sync({ alter: true });
//     // await DocumentTran.sync({ alter: true });
//     // await EventTypeMaster.sync({ alter: true });

//     await Skill.sync({ alter: true });



//     console.log('Selected models synchronized.');
//   } catch (err) {
//     console.error('Error syncing specific models:', err);
//   }
// };

// syncSpecificModels();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
