


const ContactTran = require('../models/contactTranModel');
const CountryMaster = require('../models/countryMasterModel');
const StateMaster = require('../models/stateModel');
const CityMaster = require('../models/cityModel');
const User = require('../models/userModel');

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const contact = await ContactTran.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactTran.findAll({
            include: [
                { model: CountryMaster, attributes: ['CountryName'] },
                { model: StateMaster, attributes: ['StateName'] },
                { model: CityMaster, attributes: ['CityName'] },
                { model: User, attributes: ['FirstName', 'Email'] }
            ]
        });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await ContactTran.findByPk(req.params.id, {
            include: [
                { model: CountryMaster, attributes: ['CountryName'] },
                { model: StateMaster, attributes: ['StateName'] },
                { model: CityMaster, attributes: ['CityName'] },
                { model: User, attributes: ['FirstName', 'Email'] }
            ]
        });
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a contact
exports.updateContact = async (req, res) => {
    try {
        const contact = await ContactTran.findByPk(req.params.id);
        if (contact) {
            await contact.update(req.body);
            const updatedContact = await ContactTran.findByPk(req.params.id, {
                include: [
                    { model: CountryMaster, attributes: ['CountryName'] },
                    { model: StateMaster, attributes: ['StateName'] },
                    { model: CityMaster, attributes: ['CityName'] },
                    { model: User, attributes: ['FirstName', 'Email'] }
                ]
            });
            res.status(200).json(updatedContact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await ContactTran.findByPk(req.params.id);
        if (contact) {
            await contact.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
