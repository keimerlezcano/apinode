const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleado = sequelize.define('Empleado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreEmpleado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rolEmpleado: {
        type: DataTypes.ENUM('Palafrenero', 'Cuidador', 'Veterinario', 'Administrador'),
        allowNull: false,
    },
    numeroIdentificacion: {
        type: DataTypes.STRING(10), // Longitud 10
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true, // Valida que sea un número
            len: [8, 10], // Valida que la longitud sea entre 8 y 10 caracteres
        },
    },
}, {
    timestamps: false,
    tableName: 'empleados',
});

module.exports = Empleado;