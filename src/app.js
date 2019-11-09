const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const errorHandler = require('./errorHandler')
const appRouter = require('./routes')

class App {
  constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
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
    this.express.use(errorHandler.handle)
  }
}

module.exports = new App().express
