const { body, param } = require('express-validator');
const pagosRepository = require('../repositories/pagosRepository'); // Aunque no se use, se importa para mantener la estructura

// Validación base para la creación y actualización de pagos
const pagoBaseValidation = [
    body('nombreCliente')
        .notEmpty()
        .withMessage('El nombre del cliente es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre del cliente debe tener al menos 3 caracteres'),
    body('metodoPago')
        .notEmpty()
        .withMessage('El método de pago es obligatorio')
        .isIn(['efectivo', 'transferencia'])
        .withMessage('El método de pago debe ser efectivo o transferencia'),
    body('mesPago')
        .notEmpty()
        .withMessage('El mes de pago es obligatorio')
        .isInt({ min: 1, max: 12 })
        .withMessage('El mes de pago debe ser un número entre 1 y 12')
];

// Validación para crear un pago
const createPagoValidation = [
    ...pagoBaseValidation
];

// Validación para actualizar un pago
const updatePagoValidation = [
    ...pagoBaseValidation,
    param('id').isInt().withMessage('El id debe ser un número entero')
];

// Validación para obtener un pago por ID
const getPagoByIdValidation = [
    param('id').isInt().withMessage('El id debe ser un número entero')
];

module.exports = {
    createPagoValidation,
    updatePagoValidation,
    getPagoByIdValidation
};