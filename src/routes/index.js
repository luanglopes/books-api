
const { Router } = require('express')

const userRoutes = require('./users')
const bookRoutes = require('./books')
const categoryRoutes = require('./categories')
const authRoutes = require('./auth')

class AppRouter {
  constructor () {
    this.router = new Router()

    this.registerRoutes()
  }

  registerRoutes () {
    this.router.get('/', (_req, res) => {
      res.json({ message: 'Hello' })
    })

    this.router.use('/users', userRoutes)
    this.router.use('/books', bookRoutes)
    this.router.use('/categories', categoryRoutes)
    this.router.use('/auth', authRoutes)
  }
}

module.exports = new AppRouter().router
