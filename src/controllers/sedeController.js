const { validationResult } = require('express-validator');
const sedeService = require("../services/sedeService"); // Usamos require en lugar de import

// Controlador para obtener todas las sedes
const getSedes = async (req, res) => {
    try {
        const sedes = await sedeService.listSedes(); // Usamos el servicio que ya adapta Sequelize
        res.status(200).json(sedes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las sedes', error: error.message });
    }
};

// Controlador para agregar una nueva sede
const addSede = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const sede = await sedeService.addSede(req.body); // Llamamos al servicio que maneja la creación
        res.status(201).json(sede); // Retornamos la sede creada con el código 201
    } catch (error) {
        res.status(400).json({ message: 'Error al añadir la sede', error: error.message });
    }
};

// Controlador para obtener una sede específica por su ID
const getSedeById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const sede = await sedeService.findSede(req.params.id); // Llamamos al servicio con el ID
        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada' });
        }
        res.status(200).json(sede);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la sede', error: error.message });
    }
};

// Controlador para actualizar una sede existente
const updateSede = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const sede = await sedeService.modifySede(req.params.id, req.body); // Actualizamos la sede
        if (!sede[0]) {
            return res.status(404).json({ message: 'Sede no encontrada' });
        }
        res.status(200).json({ message: 'Sede actualizada' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la sede', error: error.message });
    }
};

// Controlador para eliminar una sede
const deleteSede = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const sede = await sedeService.removeSede(req.params.id); // Llamamos al servicio para eliminar la sede
        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada' });
        }
        res.status(200).json({ message: 'Sede eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la sede', error: error.message });
    }
};

module.exports = {
    getSedes,
    addSede,
    getSedeById,
    updateSede,
    deleteSede
};