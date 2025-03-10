// empleadosService.js
const empleadosRepository = require('../repositories/empleadosRepository');

async function listEmpleados() {
    let empleados = []; // Inicializa con un valor por defecto

    try {
        console.log("listEmpleados: Intentando obtener la lista de empleados de la base de datos...");
        empleados = await empleadosRepository.getAllEmpleados();
        console.log("listEmpleados: Lista de empleados obtenida:", empleados);
        return empleados;
    } catch (error) {
        console.error("listEmpleados: Error al obtener la lista de empleados:", error);
        throw error; // Re-lanza el error
    }
}

// Buscar un empleado por ID
const findEmpleado = async (id) => {
    try {
        const empleado = await empleadosRepository.getEmpleadoById(id);
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
        return empleado;
    } catch (error) {
        throw new Error('Error al obtener el empleado');
    }
};

// Agregar un nuevo empleado
const addEmpleado = async (empleadoData) => {
    try {
        return await empleadosRepository.createEmpleado(empleadoData);
    } catch (error) {
        throw new Error('Error al agregar el empleado');
    }
};

// Modificar un empleado existente
const modifyEmpleado = async (id, empleadoData) => {
    try {
        const empleado = await empleadosRepository.updateEmpleado(id, empleadoData);
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
        return empleado;
    } catch (error) {
        throw new Error('Error al actualizar el empleado');
    }
};

// Eliminar un empleado
const removeEmpleado = async (id) => {
    try {
        const empleado = await empleadosRepository.deleteEmpleado(id);
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
        return { message: 'Empleado eliminado' };
    } catch (error) {
        throw new Error('Error al eliminar el empleado');
    }
};

// Exportamos todas las funciones agrupadas bajo un solo objeto
module.exports = {
    listEmpleados,
    findEmpleado,
    addEmpleado,
    modifyEmpleado,
    removeEmpleado
};