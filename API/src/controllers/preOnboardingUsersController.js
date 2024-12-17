const PreOnBoardingUserService = require("../services/preOnboardingUsersService");
const XLSX = require("xlsx");
const moment = require("moment");
const getallUsers = async (req, res) => {
  try {
    const allusers = await PreOnBoardingUserService.getAll();
    res.json(allusers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createSingleEntry = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await PreOnBoardingUserService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBatchFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const createdBy = req.body.CreatedBy;
    const updatedBy = req.body.UpdatedBy;

    if (!createdBy || !updatedBy) {
      return res.status(400).json({ error: 'CreatedBy and UpdatedBy are required' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const [headers, ...rows] = data;

    const headerMap = {
      'CandidateID': 'CandidateID',
      'FirstName': 'FirstName',
      'MiddleName': 'MiddleName',
      'LastName': 'LastName',
      'Email': 'Email',
      'DOJ': 'DOJ',
      'DocType': 'DocType',
      'IDNumber': 'IDNumber'
    };

    const nonEmptyRows = rows.filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''));

    const formattedData = nonEmptyRows.map(row => {
      const rowObject = {};
      headers.forEach((header, index) => {
        const mappedKey = headerMap[header.trim()];
        if (mappedKey) {
          let value = row[index];
          if (mappedKey === 'DOJ') {
            if (typeof value === 'number') {
              const date = XLSX.SSF.parse_date_code(value);
              value = moment(new Date(date.y, date.m - 1, date.d)).format('YYYY-MM-DD');
            } else if (typeof value === 'string' && value) {
              value = moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD');
            }
          }
          rowObject[mappedKey] = value;
        }
      });
      rowObject['CreatedBy'] = createdBy;
      rowObject['UpdatedBy'] = updatedBy;
      rowObject['CreatedDate'] = new Date();
      rowObject['UpdatedDate'] = new Date();
      return rowObject;
    });

    if (formattedData.length === 0) {
      return res.status(400).json({ error: 'No valid data to process' });
    }

    await PreOnBoardingUserService.createUsersFromExcel(formattedData);
    res.status(201).json({ message: 'Users created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateUser = async (req, res) => {
  try {
    const updatedUser = await PreOnBoardingUserService.updateUser(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getallUsers,
  createSingleEntry,
  createBatchFromExcel,
  updateUser,
};
