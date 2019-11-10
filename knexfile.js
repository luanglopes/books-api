require('dotenv').config({ path: `${process.env.NODE_ENV}.env` })

const databaseConfig = require('./src/config/database')

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig
  },
  production: {
    ...databaseConfig
  }
}
