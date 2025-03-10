const { body, param } = require('express-validator');
const { sedeExists, sedeExistsById } = require('../repositories/sedeRepository'); // Importamos las funciones del repositorio

// Validación base para la creación y actualización de sedes
const sedeBaseValidation = [
    body('NombreSede')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres')
        .matches(/^[^0-9]+$/) // Asegura que no haya números en el nombre
        .withMessage('El nombre de la sede no puede contener números')
];

// Validación para crear una sede
const createSedeValidation = [
    ...sedeBaseValidation,
    body('NombreSede').custom(async (NombreSede) => {
        const exists = await sedeExists(NombreSede);
        if (exists) {
            return Promise.reject('La sede ya existe');
        }
    })
];

// Validación para actualizar una sede
const updateSedeValidation = [
    ...sedeBaseValidation,
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id) => {
        const exists = await sedeExistsById(id);
        if (!exists) {
            return Promise.reject('La sede no existe');
        }
    })
];

// Validación para eliminar una sede
const deleteSedeValidation = [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id) => {
        const exists = await sedeExistsById(id);
        if (!exists) {
            return Promise.reject('La sede no existe');
        }
    })
];

// Validación para obtener una sede por ID
const getSedeByIdValidation = [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id) => {
        const exists = await sedeExistsById(id);
        if (!exists) {
            return Promise.reject('La sede no existe');
        }
    })
];

module.exports = {
    createSedeValidation,
    updateSedeValidation,
    deleteSedeValidation,
    getSedeByIdValidation
};
