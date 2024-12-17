// services/projectService.js
const Project = require('../models/onSiteProjectModel');

exports.createProject = async (projectData) => {
    projectData.CreatedDate = new Date;
    projectData.UpdatedDate = new Date;
    return await Project.create(projectData);
};

exports.getProjects = async () => {
    return await Project.findAll();
};

exports.getProjectByUserId = async (userId) => {
    return await Project.findAll({
        where: {
            UserID: userId
        }
    });
};

exports.getProjectById = async (id) => {
    return await Project.findOne({
        where: {
            ProjectID: id
        }
    });
};

exports.updateProject = async (id, updatedData) => {
    updatedData.UpdatedDate = new Date;
    return await Project.update(updatedData, {
        where: {
            ProjectID: id
        }
    });
};

exports.deleteProject = async (id) => {
    return await Project.destroy({
        where: {
            ProjectID: id
        }
    });
};