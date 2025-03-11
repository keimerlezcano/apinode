// services/pagosService.js
const { Pago } = require('../models');

const getAllPagos = async () => {
    try {
        const pagos = await Pago.findAll();
        return pagos;
    } catch (error) {
        throw new Error('Error al obtener los pagos');
    }
};

const getPagoById = async (id) => {
    try {
        const pago = await Pago.findByPk(id);
        return pago;
    } catch (error) {
        throw new Error('Error al obtener el pago');
    }
};

const createPago = async (data) => {
    try {
        const nuevoPago = await Pago.create(data);
        return nuevoPago;
    } catch (error) {
        throw new Error('Error al crear el pago');
    }
};

const updatePago = async (id, data) => {
    try {
        const pago = await Pago.findByPk(id);
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        // Actualiza solo los campos permitidos
        pago.nombreCliente = data.nombreCliente;
        pago.metodoPago = data.metodoPago;
        pago.mesPago = data.mesPago;

        await pago.save(); // Guarda los cambios
        return pago;

    } catch (error) {
        throw new Error('Error al actualizar el pago');
    }
};

module.exports = {
    getAllPagos,
    getPagoById,
    createPago,
    updatePago
};