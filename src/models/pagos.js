// models/pago.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pago = sequelize.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3],
                msg: 'El nombre del cliente debe tener al menos 3 caracteres'
            }
        }
    },
    fechaPago: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Establece la fecha actual por defecto
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1000000.00, // Valor por defecto: 1.000.000
        // validate: {
        //     isIn: {
        //         args: [[1000000.00]], // Solo permite el valor 1.000.000
        //         msg: 'El valor del pago debe ser 1.000.000'
        //     }
        // }
    },
    metodoPago: {
        type: DataTypes.ENUM('efectivo', 'transferencia'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['efectivo', 'transferencia']],
                msg: 'El método de pago debe ser efectivo o transferencia'
            }
        }
    },
    mesPago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
            max: 12,
            msg: 'El mes de pago debe ser un número entre 1 y 12'
        }
    }
}, {
    tableName: 'pagos', // Nombre de la tabla en la base de datos
    timestamps: false   // Si no usas campos createdAt y updatedAt
});

module.exports = Pago;