const { Router } = require('express')

const BookController = require('../controllers/BookController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

class BookRouter {
  constructor () {
    this.router = new Router()
    this.controller = new BookController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', authMiddleware, roleMiddleware('admin', 'librarian'), this.controller.create)
    this.router.put('/:id', authMiddleware, roleMiddleware('admin', 'librarian'), this.controller.update)
    this.router.delete('/:id', authMiddleware, roleMiddleware('admin', 'librarian'), this.controller.delete)
  }
}

module.exports = new BookRouter().router
