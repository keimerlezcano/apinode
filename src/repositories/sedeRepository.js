const Sede = require('../models/sede'); // Importamos el modelo de Sede

// Crear una nueva sede
const createSede = async (sedeData) => {
    return Sede.create(sedeData);
}

// Obtener todas las sedes
const getAllSedes = async () => {
    return Sede.findAll();
}

// Obtener una sede por ID
const getSedeById = async (id) => {
    return Sede.findByPk(id);
}

// Actualizar una sede por ID
const updateSede = async (id, sedeData) => {
    return Sede.update(sedeData, { where: { id } });
}

// Eliminar una sede por ID
const deleteSede = async (id) => {
    return Sede.destroy({ where: { id } });
}

// Verificar si una sede existe por nombre
const sedeExists = async (NombreSede) => {
    return Sede.findOne({ where: { NombreSede } });
}

module.exports = {
    createSede,
    getAllSedes,
    getSedeById,
    updateSede,
    deleteSede,
    sedeExists
};
