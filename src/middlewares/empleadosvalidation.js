const { body, param } = require('express-validator');
const Empleado = require('../models/empleados'); // Asegúrate de importar el modelo de Empleado

// Validación base para la creación y actualización de empleados
const empleadoBaseValidation = [
    body('nombreEmpleado')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    body('rolEmpleado')
        .isIn(['Palafrenero', 'Cuidador', 'Veterinario', 'Administrador'])
        .withMessage('El rol debe ser uno de los siguientes: "Palafrenero", "Cuidador", "Veterinario", "Administrador"'),
    body('numeroIdentificacion')
        .isNumeric()
        .withMessage('El número de identificación debe contener solo números')
        .isLength({ min: 8, max: 10 })
        .withMessage('El número de identificación debe tener entre 8 y 10 caracteres')
];

// Validación para crear un nuevo empleado
const createEmpleadoValidation = [
    ...empleadoBaseValidation,
    body('numeroIdentificacion').custom(async (numeroIdentificacion) => {
        const empleadoExists = await Empleado.findOne({ where: { numeroIdentificacion } });
        if (empleadoExists) {
            return Promise.reject('Ya existe un empleado con este número de identificación');
        }
    })
];

// Validación para actualizar un empleado
const updateEmpleadoValidation = [
    ...empleadoBaseValidation,
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id, { req }) => {
        const empleadoExists = await Empleado.findByPk(id);
        if (!empleadoExists) {
            return Promise.reject('El empleado no existe');
        }
        req.empleadoOriginal = empleadoExists; // Guarda el empleado original en el request
    }),
    
    body('numeroIdentificacion').custom(async (numeroIdentificacion, { req }) => {
        if (numeroIdentificacion !== req.empleadoOriginal.numeroIdentificacion) {
            // Si el numeroIdentificacion se modificó, verifica que sea único
            const empleadoExists = await Empleado.findOne({ where: { numeroIdentificacion } });
            if (empleadoExists) {
                return Promise.reject('Ya existe un empleado con este número de identificación');
            }
        }
        return true; // Si no se modificó, no hagas la validación
    })
];

// Validación para eliminar un empleado
const deleteEmpleadoValidation = [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id) => {
        const empleadoExists = await Empleado.findByPk(id);
        if (!empleadoExists) {
            return Promise.reject('El empleado no existe');
        }
    })
];

// Validación para obtener un empleado por ID
const getEmpleadoByIdValidation = [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    param('id').custom(async (id) => {
        const empleadoExists = await Empleado.findByPk(id);
        if (!empleadoExists) {
            return Promise.reject('El empleado no existe');
        }
    })
];

module.exports = {
    createEmpleadoValidation,
    updateEmpleadoValidation,
    deleteEmpleadoValidation,
    getEmpleadoByIdValidation
};