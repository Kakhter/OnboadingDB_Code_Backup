// controllers/projectController.js
const projectService = require('../services/onSiteProjectService');

exports.createProject = async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getProjectByUserId = async (req, res) => {
    try {
        const project = await projectService.getProjectByUserId(req.params.userId);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: 'Project not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: 'Project not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const [updated] = await projectService.updateProject(req.params.id, req.body);
        if (updated) {
            res.status(200).json({
                message: 'Project updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Project not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const result = await projectService.deleteProject(req.params.id);
        if (result) {
            res.status(200).json({
                message: 'Project deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Project not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};