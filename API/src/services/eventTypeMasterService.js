const EventTypeMaster = require('../models/eventTypeMasterModel');

const createEventType = async (data) => {
    const eventType = await EventTypeMaster.create({
        EventDesc: data.EventDesc,
        CreatedBy: data.CreatedBy,
        CreatedDate: new Date(),
    });
    return eventType;
};

const getAllEventTypes = async () => {
    const eventTypes = await EventTypeMaster.findAll();
    return eventTypes;
};

const getEventTypeById = async (id) => {
    const eventType = await EventTypeMaster.findByPk(id);
    return eventType;
};

const updateEventType = async (id, data) => {
    const eventType = await EventTypeMaster.findByPk(id);
    if (!eventType) throw new Error('Event type not found');

    eventType.EventDesc = data.EventDesc || eventType.EventDesc;
    eventType.UpdatedBy = data.UpdatedBy || eventType.UpdatedBy;
    eventType.UpdatedDate = new Date();

    await eventType.save();
    return eventType;
};

const deleteEventType = async (id) => {
    const eventType = await EventTypeMaster.findByPk(id);
    if (!eventType) throw new Error('Event type not found');

    await eventType.destroy();
    return { message: 'Event type deleted' };
};

module.exports = {
    createEventType,
    getAllEventTypes,
    getEventTypeById,
    updateEventType,
    deleteEventType,
};
