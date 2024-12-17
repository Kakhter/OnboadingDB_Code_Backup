const ClientMaster = require('../models/clientMasterModel');
const { Op } = require("sequelize");
const getAllClients = async () => {
    try {
        return await ClientMaster.findAll();
    } catch (error) {
        throw new Error('Error fetching clients: ' + error.message);
    }
};

const getClientById = async (id) => {
    try {
        return await ClientMaster.findByPk(id);
    } catch (error) {
        throw new Error('Error fetching client: ' + error.message);
    }
};

const createClient = async (data) => {
    try {
        // Check if ClientName already exists
        const existingClient = await ClientMaster.findOne({ where: { ClientName: data.ClientName } });
        if (existingClient) throw new Error('ClientName already exists');

        return await ClientMaster.create(data);
    } catch (error) {
        throw new Error('Error creating client: ' + error.message);
    }
};

const updateClient = async (id, data) => {
    try {
        const client = await ClientMaster.findByPk(id);
        if (!client) throw new Error('Client not found');

        // Check if new ClientName already exists
        if (data.ClientName) {
            const existingClient = await ClientMaster.findOne({ where: { ClientName: data.ClientName, ClientID: { [Op.ne]: id } } });
            if (existingClient) throw new Error('ClientName already exists');
        }

        return await client.update(data);
    } catch (error) {
        throw new Error('Error updating client: ' + error.message);
    }
};

const deleteClient = async (id) => {
    try {
        const client = await ClientMaster.findByPk(id);
        if (!client) throw new Error('Client not found');

        return await client.destroy();
    } catch (error) {
        throw new Error('Error deleting client: ' + error.message);
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};
