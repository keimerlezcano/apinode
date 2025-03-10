const { Router } = require('express');
const validateEmpleado = require('../middlewares/empleadosvalidation');  // Importa las validaciones de empleados
const empleadosController = require('../controllers/empleadosController.js'); // Importa los controladores de empleados

const router = Router();

// Obtener todos los empleados
router.get('/', empleadosController.getEmpleados);

// Obtener un empleado por su ID
router.get('/:id', empleadosController.getEmpleadoById);

// Crear un nuevo empleado
router.post('/', validateEmpleado.createEmpleadoValidation, empleadosController.addEmpleado);

// Actualizar un empleado existente
router.put('/:id', validateEmpleado.updateEmpleadoValidation, empleadosController.updateEmpleado);
router.delete('/:id', validateEmpleado.deleteEmpleadoValidation, empleadosController.deleteEmpleado);
    
module.exports = router; // Exporta el enrutador
