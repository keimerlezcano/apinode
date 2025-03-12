const { Router } = require('express');
const { createPagoValidation, updatePagoValidation, getPagoByIdValidation } = require('../middlewares/pagosValidation');
const pagosController = require('../controllers/pagosController');

const router = Router();

// Obtener todos los pagos
router.get('/', pagosController.getPagos);

// Obtener un pago por ID
router.get('/:id', getPagoByIdValidation, pagosController.getPagoById);

// Crear un nuevo pago
router.post('/', createPagoValidation, pagosController.addPago);

// Actualizar un pago (sin permitir la edición del valor ni la fecha)
router.put('/:id', updatePagoValidation, pagosController.updatePago);

module.exports = router;