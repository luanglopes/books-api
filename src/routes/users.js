const UserController = require('../controllers/UserController')
const { Router } = require('express')

class UserRouter {
  constructor () {
    this.router = new Router()
    this.controller = new UserController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
  }
}

module.exports = new UserRouter().router
