const express = require('express');
const app = express();

// Middleware para manejar JSON en las peticiones
app.use(express.json());

// Importamos las rutas de sedes, empleados y pagos
const sedeRouter = require('./src/routes/sedeRoutes'); // Ruta para las sedes
const empleadoRouter = require('./src/routes/empleadosRoutes'); // Ruta para los empleados
const pagosRoutes = require('./src/routes/pagosRoutes'); // Ruta para los pagos


// Usamos las rutas en el endpoint correspondiente
app.use('/sedes', sedeRouter); // Las rutas de sedes estarán bajo el prefijo /sedes
app.use('/empleados', empleadoRouter); // Las rutas de empleados estarán bajo el prefijo /empleados
app.use('/pagos', pagosRoutes); // Rutas de pagos


// Importar la conexión de la base de datos
const sequelize = require('./src/config/database');

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
    return sequelize.authenticate(); // Autenticar después de sincronizar
  })
  .then(() => {
    console.log('Conexión a la base de datos ha sido exitosa.');
    // Iniciar el servidor
    const PORT = process.env.PORT // Usar variable de entorno PORT o 3000 por defecto
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('No se pudo conectar ni sincronizar con la base de datos:', error);
  });

module.exports = app;