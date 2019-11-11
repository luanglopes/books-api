require('dotenv').config()

const databaseConfig = require('./src/config/database')

module.exports = {
  development: {
    ...databaseConfig,
  },
  production: {
    ...databaseConfig,
  },
}
