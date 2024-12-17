const SKill = require('../models/skillModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');
// Create a new skill
const createSkill = async (skillData) => {
    try {
        const skillsArray = skillData.Skills.split(',').map(skill => skill.trim());

        // Prepare skill data with converted skills array
        const newSkillData = {
            ...skillData,
            Skills: skillsArray
        };

        // Check if a skill with the same Skills and UserID already exists
        const existingSkill = await SKill.findOne({
            where: {
                Skills: {
                    [Op.contains]: skillsArray
                },
                UserID: newSkillData.UserID
            }
        });

        if (existingSkill) {
            return { message: 'Skill already exists' };
        }

        // If the skill does not exist, create a new one
        const skill = await SKill.create(newSkillData);
        return skill;
    } catch (error) {
        throw new Error(`Error creating skill: ${error.message}`);
    }
};

// Get all skills
const getAllSkills = async () => {
    try {
        const skills = await SKill.findAll();
        return skills;
    } catch (error) {
        throw new Error(`Error fetching skills: ${error.message}`);
    }
};

// Get a skill by ID
const getSkillById = async (id) => {
    try {
        const skill = await SKill.findByPk(id);
        if (!skill) {
            throw new Error('Skill not found');
        }
        return skill;
    } catch (error) {
        throw new Error(`Error fetching skill by ID: ${error.message}`);
    }
};

const getSkillByUserId = async (userid) => {
    try {
        const skill = await SKill.findOne({where:{UserID:userid}});
        if (!skill) {
            throw new Error('Skill not found');
        }
        return skill;
    } catch (error) {
        throw new Error(`Error fetching skill by ID: ${error.message}`);
    }
};

// Update a skill by ID
const updateSkillById = async (id, skillData) => {
    try {
        const skillsArray = skillData.Skills.split(',').map(skill => skill.trim());

        const skill = await SKill.findByPk(id);
        if (!skill) {
            throw new Error('Skill not found');
        }
        await skill.update({ ...skillData, Skills: skillsArray });
        return skill;
    } catch (error) {
        throw new Error(`Error updating skill: ${error.message}`);
    }
};

// Delete a skill by ID
const deleteSkillById = async (id) => {
    try {
        const skill = await SKill.findByPk(id);
        if (!skill) {
            throw new Error('Skill not found');
        }
        await skill.destroy();
        return { message: 'Skill deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting skill: ${error.message}`);
    }
};

// Search for users by skill
const findUsersBySkill = async (skillQuery) => {
    try {
        // Find all skills that match the query
        const skills = await SKill.findAll({
            where: {
                Skills: {
                    [Op.contains]: [skillQuery]
                }
            },
            include: [{
                model: User,
                as: 'User',
                attributes: { exclude: ['Password'] }
            }]
        });

        // Extract unique users
        const userSet = new Set();
        skills.forEach(skill => userSet.add(skill.User));

        return Array.from(userSet);
    } catch (error) {
        throw new Error(`Error searching users by skill: ${error.message}`);
    }
};
module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkillById,
    deleteSkillById,
    findUsersBySkill,
    getSkillByUserId
};
