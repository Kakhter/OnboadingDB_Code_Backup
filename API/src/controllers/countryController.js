// controllers/countryMasterController.js
const CountryMaster = require('../models/countryMasterModel');

// Get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await CountryMaster.findAll();
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new country
exports.createCountry = async (req, res) => {
  try {
    const country = await CountryMaster.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a country by ID
exports.getCountryById = async (req, res) => {
  try {
    const country = await CountryMaster.findByPk(req.params.id);
    if (country) {
     // res.json(country);
      res.status(200).json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getNationalityById = async (req, res) => {
  try {
    const country = await CountryMaster.findByPk(req.params.id);
    if (country) {
     // res.json(country);
      res.status(200).json(country.dataValues.Nationality);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ error: error.message });
  }
};


// Update a country
exports.updateCountry = async (req, res) => {
  try {
    const [updated] = await CountryMaster.update(req.body, {
      where: { CountryID: req.params.id },
    });
    if (updated) {
      const updatedCountry = await CountryMaster.findByPk(req.params.id);
      res.json(updatedCountry);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a country
exports.deleteCountry = async (req, res) => {
  try {
    const deleted = await CountryMaster.destroy({
      where: { CountryID: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ error: error.message });
  }
};
