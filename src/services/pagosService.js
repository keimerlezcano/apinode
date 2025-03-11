// services/pagosService.js
const pagosRepository = require('../repositories/pagosRepository');

const getAllPagos = async () => {
    try {
        const pagos = await pagosRepository.getAllPagos();
        return pagos;
    } catch (error) {
        throw new Error('Error al obtener los pagos');
    }
};

const getPagoById = async (id) => {
    try {
        const pago = await pagosRepository.getPagoById(id);
        return pago;
    } catch (error) {
        throw new Error('Error al obtener el pago');
    }
};

const createPago = async (data) => {
    try {
        const nuevoPago = await pagosRepository.createPago(data);
        return nuevoPago;
    } catch (error) {
        throw new Error('Error al crear el pago');
    }
};

const updatePago = async (id, data) => {
    try {
        const pago = await pagosRepository.updatePago(id, data);
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