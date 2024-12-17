// const { Pool } = require('pg');
// const config = require('./config');
// const { query } = require('express');

// const pool = new Pool(config.db);
// pool.connect((err) => {
//     if (err) {
//         console.error('Failed to connect to PostgreSQL', err);
//     } else {
//         console.log('Connected to PostgreSQL');
//     }
// });

// module.exports = {
//     query: (text, params) => pool.query(text, params)
// };

// src/config/db.js

// const { Sequelize } = require('sequelize');
// const config = require('./config');

// const { user, host, database, password, port } = config.db;
// const sequelize = new Sequelize(database, user, password, {
//     host,
//     port,
//     dialect: 'postgres',
// });

// const authenticate = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database: ', error);
//     }
// };

// authenticate();
// module.exports = sequelize;
const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;

