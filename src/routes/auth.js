const { Router } = require('express')

const AuthController = require('../controllers/AuthController')

class AuthRouter {
  constructor () {
    this.router = new Router()
    this.controller = new AuthController()

    this.routes()
  }

  routes () {
    this.router.post('/', this.controller.authenticate)
    this.router.post('/verify-token', this.controller.verifyToken)
  }
}

module.exports = new AuthRouter().router
