const eventTypeService = require('../services/eventTypeMasterService');

const createEventType = async (req, res) => {
    try {
        const eventType = await eventTypeService.createEventType(req.body);
        res.status(201).json(eventType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllEventTypes = async (req, res) => {
    try {
        const eventTypes = await eventTypeService.getAllEventTypes();
        res.json(eventTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEventTypeById = async (req, res) => {
    try {
        const eventType = await eventTypeService.getEventTypeById(req.params.id);
        if (!eventType) return res.status(404).json({ error: 'Event type not found' });
        res.json(eventType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEventType = async (req, res) => {
    try {
        const eventType = await eventTypeService.updateEventType(req.params.id, req.body);
        res.json(eventType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteEventType = async (req, res) => {
    try {
        const message = await eventTypeService.deleteEventType(req.params.id);
        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEventType,
    getAllEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType,
};
