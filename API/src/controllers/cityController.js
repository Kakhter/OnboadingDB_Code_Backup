

const City = require('../models/cityModel');

exports.createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(500).json({ message: 'Failed to create city' });
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
};


exports.getCitiesByStateId = async (req, res) => {
  try {
    const cities = await City.findAll({
      where: { StateID: req.params.stateId }
    });
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
};


// Update an existing city by CityID
exports.updateCity = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const [updated] = await City.update(req.body, {
      where: { CityID: cityId }
    });

    if (updated) {
      const updatedCity = await City.findOne({ where: { CityID: cityId } });
      res.status(200).json({ message: 'City updated successfully', city: updatedCity });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ message: 'Failed to update city' });
  }
};




// const City = require('../models/cityModel');

// exports.createCity = async (req, res) => {
//   try {
//     const city = await City.create(req.body);
//     res.status(201).json(city);
//   } catch (error) {
//     console.error('Error creating city:', error);
//     res.status(500).json({ message: 'Failed to create city' });
//   }
// };

// exports.getAllCities = async (req, res) => {
//   try {
//     const cities = await City.findAll();
//     res.status(200).json(cities);
//   } catch (error) {
//     console.error('Error fetching cities:', error);
//     res.status(500).json({ message: 'Failed to fetch cities' });
//   }
// };


// exports.getCitiesByCountryId = async (req, res) => {
//   try {
//     const cities = await City.findAll({
//       where: { CountryID: req.params.countryId }
//     });
//     res.status(200).json(cities);
//   } catch (error) {
//     console.error('Error fetching cities:', error);
//     res.status(500).json({ message: 'Failed to fetch cities' });
//   }
// };


// // Update an existing city by CityID
// exports.updateCity = async (req, res) => {
//   try {
//     const cityId = req.params.cityId;
//     const [updated] = await City.update(req.body, {
//       where: { CityID: cityId }
//     });

//     if (updated) {
//       const updatedCity = await City.findOne({ where: { CityID: cityId } });
//       res.status(200).json({ message: 'City updated successfully', city: updatedCity });
//     } else {
//       res.status(404).json({ message: 'City not found' });
//     }
//   } catch (error) {
//     console.error('Error updating city:', error);
//     res.status(500).json({ message: 'Failed to update city' });
//   }
// };




// exports.getCitiesByStateId = async (req, res) => {
//   try {
//     const cities = await City.findAll({
//       where: { StateID: req.params.stateId }
//     });
//     res.status(200).json(cities);
//   } catch (error) {
//     console.error('Error fetching cities:', error);
//     res.status(500).json({ message: 'Failed to fetch cities' });
//   }
// };
