
const Education = require('../models/educationModel'); 


exports.createEducation = async (req, res) => {
  const sections = req.body;
  //console.log(sections);
  try {
    for (const section of sections) {
      // Ensure mandatory fields are present
      if (section.EducDescription && 
        (section.CountryID || section.StateID || section.BoardORUniversity || section.InstituteName || section.Degree || section.Branch || section.PassedOn)) {
        
        // Check if either PercentageMarks or CGPA is provided
        if (!section.PercentageMarks && !section.CGPA) {
          return res.status(400).json({ message: `${section.EducDescription}: Either PercentageMarks or CGPA is required.` });
        }

        // Convert empty strings to null for numeric fields
        section.PercentageMarks = section.PercentageMarks.trim() === '' ? null : parseFloat(section.PercentageMarks);
        section.CGPA = section.CGPA.trim() === '' ? null : parseFloat(section.CGPA);

        // Validate PercentageMarks
        if (section.PercentageMarks !== null && (isNaN(section.PercentageMarks) || section.PercentageMarks < 1 || section.PercentageMarks > 100)) {
          return res.status(400).json({ message: `${section.EducDescription}: PercentageMarks must be between 1 and 100.` });
        }

        // Validate CGPA
        if (section.CGPA !== null && (isNaN(section.CGPA) || section.CGPA < 1 || section.CGPA > 10)) {
          return res.status(400).json({ message: `${section.EducDescription}: CGPA must be between 1 and 10.` });
        }

        await Education.create(section);
      }
    }
    res.status(200).json({ message: 'Education details saved successfully' });
  } catch (error) {
    console.error('Failed to save education details:', error);
    res.status(500).json({ message: 'Failed to save education details', error });
  }
};


exports.getAllEducation = async (req, res) => {
  try {
    const educations = await Education.findAll();
    res.status(200).json(educations);
  } catch (error) {
    console.error('Error fetching education records:', error);
    res.status(500).json({ error: error.message });
  }
};
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    console.error('Error fetching education record by ID:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    await education.update(req.body);
    res.status(200).json(education);
  } catch (error) {
    console.error('Error updating education record:', error);
    res.status(400).json({ error: error.message });
  }
};


exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    await education.destroy();
    res.status(200).json({ message: 'Education record deleted successfully' });
  } catch (error) {
    console.error('Error deleting education record:', error);
    res.status(500).json({ error: error.message });
  }
};



exports.getEducationByUserId = async (req, res) => {
  try {
    const educations = await Education.findAll({ where: { UserID: req.params.userId } });

    if (educations.length === 0) {
      return res.status(404).json({ error: 'No education records found for this user' });
    }
    
    res.status(200).json(educations);
  } catch (error) {
    console.error('Error fetching education records by UserID:', error);
    res.status(500).json({ error: 'Failed to fetch education records by UserID', details: error.message });
  }
};




