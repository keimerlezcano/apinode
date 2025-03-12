const { validationResult } = require('express-validator');
const pagosService = require('../services/pagosService');

// Controlador para obtener todos los pagos
const getPagos = async (req, res) => {
    try {
        const pagos = await pagosService.listPagos();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos', error: error.message });
    }
};

// Controlador para agregar un nuevo pago
const addPago = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const pago = await pagosService.createPago(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(400).json({ message: 'Error al añadir el pago', errors: error.errors });
    }
};

// Controlador para obtener un pago específico por su ID
const getPagoById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const pago = await pagosService.getPagoById(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pago', error: error.message });
    }
};

// Controlador para actualizar un pago existente
const updatePago = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const pago = await pagosService.updatePago(req.params.id, req.body);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json({ message: 'Pago actualizado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el pago', error: error.message });
    }
};

module.exports = {
    getPagos,
    addPago,
    getPagoById,
    updatePago
};