const pagosRepository = require('../repositories/pagosRepository');

const listPagos = async () => {
    try {
        return await pagosRepository.getAllPagos();
    } catch (error) {
        throw new Error('Error al obtener los pagos');
    }
};

const findPago = async (id) => {
    try {
        const pago = await pagosRepository.getPagoById(id);
        if (!pago) {
            throw new Error('Pago no encontrado');
        }
        return pago;
    } catch (error) {
        throw new Error('Error al obtener el pago');
    }
};

const addPago = async (pagoData) => {
    try {
        return await pagosRepository.createPago(pagoData);
    } catch (error) {
        throw new Error('Error al agregar el pago');
    }
};

const modifyPago = async (id, pagoData) => {
    try {
        const pago = await pagosRepository.updatePago(id, pagoData);
        if (!pago) {
            throw new Error('Pago no encontrado');
        }
        return pago;
    } catch (error) {
        throw new Error('Error al actualizar el pago');
    }
};

module.exports = {
    listPagos,
    findPago,
    addPago,
    modifyPago
};