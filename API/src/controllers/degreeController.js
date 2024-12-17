
const Degree = require('../models/degreeModel');

// Create a new degree
exports.createDegree = async (req, res) => {
  try {
    const degree = await Degree.create(req.body);
    res.status(201).json(degree);
  } catch (error) {
    console.error('Error creating degree:', error);
    res.status(500).json({ message: 'Failed to create degree' });
  }
};

// Get all degrees
exports.getAllDegrees = async (req, res) => {
  try {
    const degrees = await Degree.findAll();
    res.status(200).json(degrees);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    res.status(500).json({ message: 'Failed to fetch degrees' });
  }
};

// Get degree by ID
exports.getDegreeById = async (req, res) => {
  try {
    const degree = await Degree.findByPk(req.params.id);
    if (degree) {
      res.status(200).json(degree);
    } else {
      res.status(404).json({ message: 'Degree not found' });
    }
  } catch (error) {
    console.error('Error fetching degree:', error);
    res.status(500).json({ message: 'Failed to fetch degree' });
  }
};

// Update degree
exports.updateDegree = async (req, res) => {
  try {
    const degree = await Degree.findByPk(req.params.id);
    if (degree) {
      await degree.update(req.body);
      res.status(200).json(degree);
    } else {
      res.status(404).json({ message: 'Degree not found' });
    }
  } catch (error) {
    console.error('Error updating degree:', error);
    res.status(500).json({ message: 'Failed to update degree' });
  }
};

// Delete degree
exports.deleteDegree = async (req, res) => {
  try {
    const degree = await Degree.findByPk(req.params.id);
    if (degree) {
      await degree.destroy();
      res.status(200).json({ message: 'Degree deleted successfully' });
    } else {
      res.status(404).json({ message: 'Degree not found' });
    }
  } catch (error) {
    console.error('Error deleting degree:', error);
    res.status(500).json({ message: 'Failed to delete degree' });
  }
};
