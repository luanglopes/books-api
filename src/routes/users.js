const { Router } = require('express')

const UserController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

class UserRouter {
  constructor () {
    this.router = new Router()
    this.controller = new UserController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', authMiddleware, roleMiddleware('admin'), this.controller.create)
    this.router.put('/:id', authMiddleware, roleMiddleware('admin'), this.controller.update)
    this.router.delete('/:id', authMiddleware, roleMiddleware('admin'), this.controller.delete)
    this.router.get('/:id/favorites', authMiddleware, this.controller.listFavoriteBooks)
    this.router.post('/:id/favorites', authMiddleware, this.controller.addFavoriteBook)
    this.router.delete('/:id/favorites/:bookId', authMiddleware, this.controller.removeFavoriteBook)
  }
}

module.exports = new UserRouter().router
