
const { Router } = require('express')

const User = require('../models/User')
const UserRepository = require('../repositories/UserRepository')
const UserService = require('../services/UserService')
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const { roles } = require('../constants/user')

class UserRouter {
  constructor () {
    this.router = new Router()

    const userRepository = new UserRepository(User)
    const usersService = new UserService(userRepository)
    this.controller = new UserController(usersService)

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', authMiddleware, roleMiddleware(roles.admin), this.controller.create)
    this.router.put('/:id', authMiddleware, roleMiddleware(roles.admin), this.controller.update)
    this.router.delete('/:id', authMiddleware, roleMiddleware(roles.admin), this.controller.delete)
    this.router.get('/:id/favorites', authMiddleware, this.controller.listFavoriteBooks)
    this.router.post('/:id/favorites', authMiddleware, this.controller.addFavoriteBook)
    this.router.delete('/:id/favorites/:bookId', authMiddleware, this.controller.removeFavoriteBook)
  }
}

module.exports = new UserRouter().router
