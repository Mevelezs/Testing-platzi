const { config } = require('./../config/config');

module.exports = { // conecta con la db parala migración => importado desde .sequelizerc
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
