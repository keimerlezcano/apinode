const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sede = sequelize.define('Sede', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NombreSede: { type: DataTypes.STRING, allowNull: false }
}, { 
    timestamps: false,
    });

module.exports = Sede;