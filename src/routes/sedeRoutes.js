const { Router } = require('express');
const validateSede = require('../middlewares/sedevalidation');  // Importa la validación de sedes
const sedeController = require('../controllers/sedeController.js'); // Importa los controladores de sedes

const router = Router();

// Obtener todas las sedes
router.get('/', sedeController.getSedes);

// Obtener una sede por su ID
router.get('/:id', sedeController.getSedeById);

// Crear una nueva sede
router.post('/', validateSede.createSedeValidation, sedeController.addSede);

// Actualizar una sede existente
router.put('/:id', sedeController.updateSede);

// Eliminar una sede
router.delete('/:id', sedeController.deleteSede);
    
module.exports = router; // Exporta el enrutador
