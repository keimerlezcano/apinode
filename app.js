const express = require('express');
const app = express();

// Middleware para manejar JSON en las peticiones
app.use(express.json());

// Importamos las rutas de sedes y empleados
const sedeRouter = require('./src/routes/sedeRoutes'); // Ruta para las sedes
const empleadoRouter = require('./src/routes/empleadosRoutes'); // Ruta para los empleados
const pagosRoutes = require('./routes/pagos');


// Usamos las rutas en el endpoint correspondiente
app.use('/sedes', sedeRouter); // Las rutas de sedes estarán bajo el prefijo /sedes
app.use('/empleados', empleadoRouter); // Las rutas de empleados estarán bajo el prefijo /empleados
app.use('/api/pagos', pagosRoutes);


// Importar la conexión de la base de datos
const sequelize = require('./src/config/database');

// Verificar la conexión con la base de datos
(async () => {
  try {
    // Intentamos conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos ha sido exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = app;
