// middlewares/pagosValidation.js
const { body, validationResult } = require('express-validator');

// Reglas de validación para la creación y actualización de pagos
const pagoValidationRules = [
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

// Middleware para ejecutar las validaciones
const validatePago = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Error de validación', errors: errors.array() });
    }
    next();
};

module.exports = {
    pagoValidationRules,
    validatePago
};