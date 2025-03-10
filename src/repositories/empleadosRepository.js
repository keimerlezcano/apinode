const Empleado = require('../models/empleados'); // Importamos el modelo de Empleado

// Crear un nuevo empleado
const createEmpleado = async (empleadoData) => {
    return Empleado.create(empleadoData);
}

// Obtener todos los empleados
const getAllEmpleados = async () => {
    return Empleado.findAll();
}

// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
    return Empleado.findByPk(id);
}

// Actualizar un empleado por ID
const updateEmpleado = async (id, empleadoData) => {
    return Empleado.update(empleadoData, { where: { id } });
}

// Eliminar un empleado por ID
const deleteEmpleado = async (id) => {
    return Empleado.destroy({ where: { id } });
}

// Verificar si un empleado existe por nombre
const empleadoExists = async (nombreEmpleado) => {
    return Empleado.findOne({ where: { nombreEmpleado } });
}

// Verificar si un empleado existe por ID
const empleadoExistsById = async (id) => {
    return Empleado.findByPk(id);
}

module.exports = {
    createEmpleado,
    getAllEmpleados,
    getEmpleadoById,
    updateEmpleado,
    deleteEmpleado,
    empleadoExists,
    empleadoExistsById
};
