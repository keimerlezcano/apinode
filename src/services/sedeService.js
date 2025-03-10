const sedeRepository = require('../repositories/sedeRepository.js');  // Importamos el repositorio

const listSedes = async () => {
    try {
        return await sedeRepository.getAllSedes();
    } catch (error) {
        throw new Error('Error al obtener las sedes');
    }
};

const findSede = async (id) => {
    try {
        const sede = await sedeRepository.getSedeById(id);
        if (!sede) {
            throw new Error('Sede no encontrada');
        }
        return sede;
    } catch (error) {
        throw new Error('Error al obtener la sede');
    }
};

const addSede = async (sedeData) => {
    try {
        return await sedeRepository.createSede(sedeData);
    } catch (error) {
        throw new Error('Error al agregar la sede');
    }
};

const modifySede = async (id, sedeData) => {
    try {
        const sede = await sedeRepository.updateSede(id, sedeData);
        if (!sede) {
            throw new Error('Sede no encontrada');
        }
        return sede;
    } catch (error) {
        throw new Error('Error al actualizar la sede');
    }
};

const removeSede = async (id) => {
    try {
        const sede = await sedeRepository.deleteSede(id);
        if (!sede) {
            throw new Error('Sede no encontrada');
        }
        return { message: 'Sede eliminada' };
    } catch (error) {
        throw new Error('Error al eliminar la sede');
    }
};

// Exportamos todas las funciones agrupadas bajo un solo objeto
module.exports = {
    listSedes,
    findSede,
    addSede,
    modifySede,
    removeSede
};