const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Define routes
router.post('/add', skillController.createSkill);
router.get('', skillController.getAllSkills);
router.get('/usersBySkills', skillController.searchUsersBySkill);
router.get('/getskillsbyuserid/:userid',skillController.getSkillByUserId);
router.get('/:id', skillController.getSkillById);
router.put('/:id', skillController.updateSkillById);
router.delete('/:id', skillController.deleteSkillById);

module.exports = router;
