// routes/pagos.js
const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');
const { pagoValidationRules, validatePago } = require('../middlewares/pagosvalidation');

// Obtener todos los pagos
router.get('/', pagosController.getAllPagos);

// Obtener un pago por ID
router.get('/:id', pagosController.getPagoById);

// Crear un nuevo pago
router.post('/', pagoValidationRules, validatePago, pagosController.createPago);

// Actualizar un pago (sin permitir la edición del valor ni la fecha)
router.put('/:id', pagoValidationRules, validatePago, pagosController.updatePago);

module.exports = router;