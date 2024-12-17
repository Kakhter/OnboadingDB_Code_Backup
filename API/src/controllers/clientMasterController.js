const clientMasterService = require('../services/clientMasterService');

const getAllClients = async (req, res) => {
    try {
        const clients = await clientMasterService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClientById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const client = await clientMasterService.getClientById(id);
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createClient = async (req, res) => {
    try {
        const data = req.body;
        const client = await clientMasterService.createClient(data);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        const client = await clientMasterService.updateClient(id, data);
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await clientMasterService.deleteClient(id);
        res.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};
