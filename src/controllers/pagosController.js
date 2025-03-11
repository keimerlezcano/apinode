// controllers/pagosController.js
const pagosService = require('../services/pagosService');

// Obtener todos los pagos
exports.getAllPagos = async (req, res) => {
    try {
        const pagos = await pagosService.getAllPagos();
        res.json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pago por ID
exports.getPagoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pago = await pagosService.getPagoById(id);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(pago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo pago
exports.createPago = async (req, res) => {
    try {
        const nuevoPago = await pagosService.createPago(req.body);
        res.status(201).json(nuevoPago);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear el pago', errors: error.errors }); // Devuelve errores de validación
    }
};

// Actualizar un pago (sin permitir la edición del valor ni la fecha)
exports.updatePago = async (req, res) => {
    const { id } = req.params;
    try {
        const pagoActualizado = await pagosService.updatePago(id, req.body);
        res.json(pagoActualizado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar el pago', errors: error.errors });
    }
};