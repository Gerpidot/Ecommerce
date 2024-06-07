const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
});
/* // Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  }); */
/* // Sincronizar modelos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error sincronizando los modelos:', error);
  });
 */
module.exports = sequelize;
