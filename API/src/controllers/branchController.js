

const Branch = require('../models/branchModel');

// Create a new branch
exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (error) {
    console.error('Error creating branch:', error);
    res.status(500).json({ message: 'Failed to create branch' });
  }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Failed to fetch branches' });
  }
};

// Get branch by ID
exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error) {
    console.error('Error fetching branch:', error);
    res.status(500).json({ message: 'Failed to fetch branch' });
  }
};

// Update branch
exports.updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      await branch.update(req.body);
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error) {
    console.error('Error updating branch:', error);
    res.status(500).json({ message: 'Failed to update branch' });
  }
};

// Delete branch
exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      await branch.destroy();
      res.status(200).json({ message: 'Branch deleted successfully' });
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error) {
    console.error('Error deleting branch:', error);
    res.status(500).json({ message: 'Failed to delete branch' });
  }
};



exports.getbranchByDegreeID = async (req, res) => {
  try {
    const { degreeId } = req.params; // Extract degreeId from request parameters
    const branches = await Branch.findAll({
      where: { DegreeID: degreeId } // Query branches by DegreeID
    });
    res.json(branches); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error'); // Handle errors
  }
};

// exports.getbranchByDegreeID= async (req, res) => {
//   try {
//     const { degreeId } = req.params;
//     const branches = await Branch.findAll({
//       where: { DegreeID: degreeId }
//     });
//     res.json(branches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// };

// module.exports = router;
