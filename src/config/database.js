// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Importa dotenv para cargar las variables de entorno

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;