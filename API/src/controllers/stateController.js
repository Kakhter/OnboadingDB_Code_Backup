
const State = require('../models/stateModel');

// Create a new state
exports.createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    console.error('Error creating state:', error);
    res.status(500).json({ message: 'Failed to create state' });
  }
};

// Get all states
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Failed to fetch states' });
  }
};

// Get a specific state by ID
exports.getStateById = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(500).json({ message: 'Failed to fetch state' });
  }
};

// Update a state
exports.updateState = async (req, res) => {
  try {
    const [updated] = await State.update(req.body, {
      where: { StateID: req.params.id }
    });
    if (updated) {
      const updatedState = await State.findByPk(req.params.id);
      res.status(200).json(updatedState);
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (error) {
    console.error('Error updating state:', error);
    res.status(500).json({ message: 'Failed to update state' });
  }
};


//IMPORTANT
 exports.getStatesByCountryId = async (req, res) => {
   try {
     const states = await State.findAll({
       where: { CountryID: req.params.countryId }
    });
    res.status(200).json(states);
   } catch (error) {
     console.error('Error fetching states:', error);
     res.status(500).json({ message: 'Failed to fetch states' });
   }
 };


// Delete a state
exports.deleteState = async (req, res) => {
  try {
    const deleted = await State.destroy({
      where: { StateID: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'State deleted' });
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(500).json({ message: 'Failed to delete state' });
  }
};
