const skillService = require('../services/skillService');

// Create a new skill
const createSkill = async (req, res) => {
    try {
        const skill = await skillService.createSkill(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await skillService.getAllSkills();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a skill by ID
const getSkillById = async (req, res) => {
    try {
        const skill = await skillService.getSkillById(req.params.id);
        res.status(200).json(skill);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getSkillByUserId = async (req, res) => {
    try {
        const skill = await skillService.getSkillByUserId(req.params.userid);
        res.status(200).json(skill);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update a skill by ID
const updateSkillById = async (req, res) => {
    try {
        const skill = await skillService.updateSkillById(req.params.id, req.body);
        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a skill by ID
const deleteSkillById = async (req, res) => {
    try {
        const result = await skillService.deleteSkillById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
// Search for users by skill
const searchUsersBySkill = async (req, res) => {
    try {
        const skillQuery = req.query.skill;
        if (!skillQuery) {
            return res.status(400).json({ error: 'Skill query parameter is required' });
        }
        const users = await skillService.findUsersBySkill(skillQuery);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkillById,
    deleteSkillById,
    searchUsersBySkill,
    getSkillByUserId
};
