const app = require('./app');
const sequelize = require('./src/config/database');
const PORT = 3307;

sequelize.sync().then(() => {
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});