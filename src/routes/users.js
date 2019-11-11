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
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', this.controller.create)
    this.router.put('/:id', this.controller.update)
    this.router.delete('/:id', this.controller.delete)
    this.router.get('/:id/favorites', this.controller.listFavoriteBooks)
    this.router.post('/:id/favorites', this.controller.addFavoriteBook)
    this.router.get('/:id/favorites/:bookId', this.controller.removeFavoriteBook)
  }
}

module.exports = new UserRouter().router
