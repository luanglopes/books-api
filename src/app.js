require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const Knex = require('knex')
const { Model, knexSnakeCaseMappers } = require('objection')

const errorHandler = require('./errorHandler')
const appRouter = require('./routes')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    const config = databaseConfig

    const knex = Knex({
      ...config,
      ...knexSnakeCaseMappers(),
    })

    Model.knex(knex)
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(morgan('dev'))
  }

  routes () {
    this.express.use(appRouter)
    this.express.use(errorHandler.notFoundHandler)
    this.express.use(errorHandler.globalHandler)
  }
}

module.exports = new App().express
