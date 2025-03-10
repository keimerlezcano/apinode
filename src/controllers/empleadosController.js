const { validationResult } = require('express-validator');
const empleadoService = require('../services/empleadosService'); // Usamos el servicio que maneja la lógica de empleados

// Controlador para obtener todos los empleados
// empleadosController.js
const getEmpleados = async (req, res) => {
    try {
        console.log("getEmpleados: Intentando obtener empleados...");
        const empleados = await empleadoService.listEmpleados();
        console.log("getEmpleados: Empleados obtenidos:", empleados);
        res.status(200).json(empleados);
    } catch (error) {
        console.error("getEmpleados: Error al obtener los empleados:", error);
        res.status(500).json({ message: 'Error al obtener los empleados', error: error.message });
    }
};

// Controlador para agregar un nuevo empleado
const addEmpleado = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const empleado = await empleadoService.addEmpleado(req.body); // Llamamos al servicio para crear el empleado
        res.status(201).json(empleado); // Retornamos el empleado creado con el código 201
    } catch (error) {
        res.status(400).json({ message: 'Error al añadir el empleado', error: error.message });
    }
};

// Controlador para obtener un empleado específico por su ID
const getEmpleadoById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const empleado = await empleadoService.findEmpleado(req.params.id); // Llamamos al servicio con el ID
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
    }
};

// Controlador para actualizar un empleado existente
const updateEmpleado = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const empleado = await empleadoService.modifyEmpleado(req.params.id, req.body); // Actualizamos el empleado
        if (!empleado[0]) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado actualizado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el empleado', error: error.message });
    }
};

// Controlador para eliminar un empleado
const deleteEmpleado = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const empleado = await empleadoService.removeEmpleado(req.params.id); // Llamamos al servicio para eliminar el empleado
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
    }
};

module.exports = {
    getEmpleados,
    addEmpleado,
    getEmpleadoById,
    updateEmpleado,
    deleteEmpleado
};