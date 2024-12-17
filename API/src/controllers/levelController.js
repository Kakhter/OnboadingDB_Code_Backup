
const Level = require('../models/levelModel');


exports.createLevel = async (req, res) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (error) {
    console.error('Error creating level:', error);
    res.status(500).json({ message: 'Failed to create level' });
  }
};


exports.getAllLevels = async (req, res) => {
  try {
    const levels = await Level.findAll();
    res.status(200).json(levels);
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ message: 'Failed to fetch levels' });
  }
};


exports.getLevelById = async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (level) {
      res.status(200).json(level);
    } else {
      res.status(404).json({ message: 'Level not found' });
    }
  } catch (error) {
    console.error('Error fetching level:', error);
    res.status(500).json({ message: 'Failed to fetch level' });
  }
};


exports.updateLevel = async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (level) {
      await level.update(req.body);
      res.status(200).json(level);
    } else {
      res.status(404).json({ message: 'Level not found' });
    }
  } catch (error) {
    console.error('Error updating level:', error);
    res.status(500).json({ message: 'Failed to update level' });
  }
};


exports.deleteLevel = async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (level) {
      await level.destroy();
      res.status(200).json({ message: 'Level deleted successfully' });
    } else {
      res.status(404).json({ message: 'Level not found' });
    }
  } catch (error) {
    console.error('Error deleting level:', error);
    res.status(500).json({ message: 'Failed to delete level' });
  }
};
